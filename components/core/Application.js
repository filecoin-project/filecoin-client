import * as React from "react";
import * as NavigationData from "~/common/navigation-data";
import * as Actions from "~/common/actions";
import * as State from "~/common/state";
import * as Credentials from "~/common/credentials";
import * as Validations from "~/common/validations";
import * as System from "~/components/system";

// NOTE(jim):
// Scenes each have an ID and can be navigated to with _handleAction
import SceneDeals from "~/scenes/SceneDeals";
import SceneEditAccount from "~/scenes/SceneEditAccount";
import SceneFile from "~/scenes/SceneFile";
import SceneFilesFolder from "~/scenes/SceneFilesFolder";
import SceneHome from "~/scenes/SceneHome";
import SceneSettings from "~/scenes/SceneSettings";
import SceneWallet from "~/scenes/SceneWallet";
import SceneSlates from "~/scenes/SceneSlates";
import SceneLocalData from "~/scenes/SceneLocalData";
import SceneSettingsDeveloper from "~/scenes/SceneSettingsDeveloper";
import SceneSignIn from "~/scenes/SceneSignIn";
import SceneSlate from "~/scenes/SceneSlate";
import SceneActivity from "~/scenes/SceneActivity";
import SceneDirectory from "~/scenes/SceneDirectory";
import SceneProfile from "~/scenes/SceneProfile";

// NOTE(jim):
// Sidebars each have a decorator and can be shown to with _handleAction
import SidebarCreateSlate from "~/components/sidebars/SidebarCreateSlate";
import SidebarCreateWalletAddress from "~/components/sidebars/SidebarCreateWalletAddress";
import SidebarWalletSendFunds from "~/components/sidebars/SidebarWalletSendFunds";
import SidebarFileStorageDeal from "~/components/sidebars/SidebarFileStorageDeal";
import SidebarAddFileToBucket from "~/components/sidebars/SidebarAddFileToBucket";
import SidebarDragDropNotice from "~/components/sidebars/SidebarDragDropNotice";
import SidebarSingleSlateSettings from "~/components/sidebars/SidebarSingleSlateSettings";

// NOTE(jim):
// Core components to the application structure.
import ApplicationNavigation from "~/components/core/ApplicationNavigation";
import ApplicationHeader from "~/components/core/ApplicationHeader";
import ApplicationLayout from "~/components/core/ApplicationLayout";
import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SIDEBARS = {
  SIDEBAR_FILE_STORAGE_DEAL: <SidebarFileStorageDeal />,
  SIDEBAR_WALLET_SEND_FUNDS: <SidebarWalletSendFunds />,
  SIDEBAR_CREATE_WALLET_ADDRESS: <SidebarCreateWalletAddress />,
  SIDEBAR_ADD_FILE_TO_BUCKET: <SidebarAddFileToBucket />,
  SIDEBAR_CREATE_SLATE: <SidebarCreateSlate />,
  SIDEBAR_DRAG_DROP_NOTICE: <SidebarDragDropNotice />,
  SIDEBAR_SINGLE_SLATE_SETTINGS: <SidebarSingleSlateSettings />,
};

const SCENES = {
  HOME: <SceneHome />,
  DIRECTORY: <SceneDirectory />,
  PROFILE: <SceneProfile />,
  VIEW_SLATE: <SceneSlate />,
  WALLET: <SceneWallet />,
  FOLDER: <SceneFilesFolder />,
  FILE: <SceneFile />,
  SLATE: <SceneSlate />,
  DEALS: <SceneDeals />,
  SETTINGS: <SceneSettings />,
  SETTINGS_DEVELOPER: <SceneSettingsDeveloper />,
  EDIT_ACCOUNT: <SceneEditAccount />,
  SLATES: <SceneSlates />,
  LOCAL_DATA: <SceneLocalData />,
  ACTIVITY: <SceneActivity />,
};

export default class ApplicationPage extends React.Component {
  _body;

  state = {
    selected: State.getSelectedState(this.props.viewer),
    viewer: State.getInitialState(this.props.viewer),
    history: [{ id: 1, scrollTop: 0, data: null }],
    currentIndex: 0,
    data: null,
    sidebar: null,
    sidebarLoading: false,
    online: null,
  };

  async componentDidMount() {
    window.addEventListener("dragenter", this._handleDragEnter);
    window.addEventListener("dragleave", this._handleDragLeave);
    window.addEventListener("dragover", this._handleDragOver);
    window.addEventListener("drop", this._handleDrop);
    window.addEventListener("online", this._handleOnlineStatus);
    window.addEventListener("offline", this._handleOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener("dragenter", this._handleDragEnter);
    window.removeEventListener("dragleave", this._handleDragLeave);
    window.removeEventListener("dragover", this._handleDragOver);
    window.removeEventListener("drop", this._handleDrop);
  }

  _handleOnlineStatus = async () => {
    window.alert(navigator.onLine ? "online" : "offline");
    this.setState({ online: navigator.onLine });
  };

  _handleRegisterFile = ({ fileLoading }) => {
    return this.setState({
      fileLoading,
    });
  };

  _handleUploadFile = async ({ file, slate }) => {
    let formData = new FormData();
    const HEIC2ANY = require("heic2any");

    // TODO(jim): Put this somewhere else to handle conversion cases.
    if (file.type.startsWith("image/heic")) {
      const converted = await HEIC2ANY({
        blob: file,
        toType: "image/png",
        quality: 1,
      });

      formData.append("data", converted);
    } else {
      formData.append("data", file);
    }

    const upload = (path) =>
      new Promise((resolve, reject) => {
        const XHR = new XMLHttpRequest();
        XHR.open("post", path, true);
        XHR.onerror = (event) => {
          console.log(event);
        };

        // NOTE(jim): UPLOADS ONLY.
        XHR.upload.addEventListener(
          "progress",
          (event) => {
            if (event.lengthComputable) {
              console.log("FILE UPLOAD PROGRESS", event);
              this.setState({
                fileLoading: {
                  ...this.state.fileLoading,
                  [`${file.lastModified}-${file.name}`]: {
                    name: file.name,
                    loaded: event.loaded,
                    total: event.total,
                  },
                },
              });
            }
          },
          false
        );

        XHR.onloadend = (event) => {
          console.log("FILE UPLOAD END", event);
          try {
            return resolve(JSON.parse(event.target.response));
          } catch (e) {
            return resolve({
              error: "SERVER_UPLOAD_ERROR",
            });
          }
        };
        XHR.send(formData);
      });

    const json = await upload(`/api/data/${file.name}`);
    console.log(json);

    if (!json || json.error || !json.data) {
      this.setState({
        fileLoading: {
          ...this.state.fileLoading,
          [`${file.lastModified}-${file.name}`]: {
            name: file.name,
            failed: true,
          },
        },
      });
      return !json ? { error: "NO_RESPONSE" } : json;
    }

    if (slate) {
      const addResponse = await fetch(`/api/slates/add-url`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slate, data: { ...json.data } }),
      });

      if (!addResponse || addResponse.error) {
        console.log(addResponse.error);
        alert("TODO: Adding an image to Slate went wrong.");
      }
    }

    return json;
  };

  _handleDragEnter = (e) => {
    if (this.state.sidebar) {
      return;
    }

    e.preventDefault();

    this._handleAction({
      type: "SIDEBAR",
      value: "SIDEBAR_DRAG_DROP_NOTICE",
    });
  };

  _handleDragLeave = (e) => {
    e.preventDefault();
  };

  _handleDragOver = (e) => {
    e.preventDefault();
  };

  _handleSidebarLoading = (sidebarLoading) => this.setState({ sidebarLoading });

  _handleDrop = async (e) => {
    e.preventDefault();

    this.setState({ fileLoading: true });

    // TODO(jim):
    // Refactor later
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);

    let slate;
    if (current.target && current.target.slatename) {
      slate = { ...current.target, id: current.target.slateId };
    }

    const files = [];
    let fileLoading = {};
    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === "file") {
          var file = e.dataTransfer.items[i].getAsFile();

          if (Validations.isFileTypeAllowed(file.type)) {
            this._handleAction({
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
              data: slate,
            });

            files.push(file);
            fileLoading[`${file.lastModified}-${file.name}`] = {
              name: file.name,
              loaded: 0,
              total: file.size,
            };
          }
        }
      }
    }

    if (!files.length) {
      alert("TODO: Files not supported error");
      return;
    }

    // NOTE(jim): Stages each file.
    this._handleRegisterFile({ fileLoading });

    // NOTE(jim): Uploads each file.
    for (let i = 0; i < files.length; i++) {
      await this._handleUploadFile({ file: files[i], slate });
    }

    // NOTE(jim): Rehydrates user.
    await this.rehydrate({ resetFiles: true });
  };

  rehydrate = async (options) => {
    const response = await Actions.hydrateAuthenticatedUser();

    console.log("REHYDRATION CALL", response);

    if (!response || response.error) {
      return null;
    }

    const updates = {
      viewer: State.getInitialState(response.data),
      selected: State.getSelectedState(response.data),
    };

    if (options && options.resetFiles) {
      updates.fileLoading = null;
      updates.sidebar = null;
    }

    this.setState(updates);

    return { rehydrated: true };
  };

  _handleSubmit = async (data) => {
    let response;

    if (data.type === "CREATE_SLATE") {
      response = await Actions.createSlate({
        name: data.name,
      });
    }

    if (data.type === "CREATE_WALLET_ADDRESS") {
      response = await Actions.updateViewer({
        type: "CREATE_FILECOIN_ADDRESS",
        address: {
          name: data.name,
          type: data.wallet_type,
          makeDefault: data.makeDefault,
        },
      });
    }

    if (data.type === "SEND_WALLET_ADDRESS_FILECOIN") {
      response = await Actions.sendFilecoin({
        source: data.source,
        target: data.target,
        amount: data.amount,
      });
    }

    console.log({ response });

    await this.rehydrate();

    this._handleDismissSidebar();

    return response;
  };

  _handleCancel = () => {
    this._handleDismissSidebar();
  };

  _handleDeleteYourself = async () => {
    // TODO(jim):
    // Put this somewhere better for messages.
    const message =
      "Do you really want to delete your account? It will be permanently removed";
    if (!window.confirm(message)) {
      return false;
    }

    let response = await Actions.deleteViewer();
    console.log("DELETE_VIEWER", response);

    await this._handleSignOut();
  };

  _handleAuthenticate = async (state) => {
    // NOTE(jim): Kills existing session cookie if there is one.
    const jwt = cookies.get(Credentials.session.key);

    if (jwt) {
      cookies.remove(Credentials.session.key);
    }

    // NOTE(jim): Acts as our existing username exists check.
    // If the user exists, move on the sign in anyways.
    let response = await Actions.createUser(state);
    console.log("CREATE_USER", response);

    response = await Actions.signIn(state);
    if (response.error) {
      console.log("SIGN IN ERROR", response);
      return null;
    }

    if (response.token) {
      // NOTE(jim):
      // + One week.
      // + Only requests to the same site.
      // + Not using sessionStorage so the cookie doesn't leave when the browser dies.
      cookies.set(Credentials.session.key, response.token, true, {
        path: "/",
        maxAge: 3600 * 24 * 7,
        sameSite: "strict",
      });
    }

    return await this.rehydrate();
  };

  _handleSignOut = () => {
    const jwt = cookies.get(Credentials.session.key);

    if (jwt) {
      cookies.remove(Credentials.session.key);
      window.location.reload();
    }
  };

  _handleViewerChange = (e) => {
    this.setState({
      viewer: { ...this.state.viewer, [e.target.name]: e.target.value },
    });
  };

  _handleSelectedChange = (e) => {
    this.setState({
      selected: { ...this.state.selected, [e.target.name]: e.target.value },
    });
  };

  _handleDismissSidebar = () => {
    this.setState({ sidebar: null, sidebarLoading: false });
  };

  _handleAction = (options) => {
    console.log(options);
    if (options.type === "NAVIGATE") {
      return this._handleNavigateTo(
        { id: options.value, scene: options.scene },
        options.data
      );
    }

    if (options.type === "NEW_WINDOW") {
      return window.open(options.value);
    }

    if (options.type === "ACTION") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "DOWNLOAD") {
      return alert(JSON.stringify(options));
    }

    if (options.type === "SIDEBAR") {
      return this.setState({
        sidebar: SIDEBARS[options.value],
        data: options.data,
      });
    }

    return alert(JSON.stringify(options));
  };

  _handleNavigateTo = (next, data = null) => {
    let body = document.getElementById("slate-client-body");
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop; //window.scrollY => body.scrollTop (where body is the body of the ApplicationLayout)
    this.state.history[this.state.currentIndex].data = this.state.data; //BUG FIX: was originally = data. So it was setting it equal to the data for the next one rather than the current one

    if (this.state.currentIndex !== this.state.history.length - 1) {
      const adjustedArray = [...this.state.history];
      adjustedArray.length = this.state.currentIndex + 1;

      return this.setState(
        {
          history: [...adjustedArray, next],
          currentIndex: this.state.currentIndex + 1,
          data,
          sidebar: null,
        },
        () => body.scrollTo(0, 0)
      );
    }

    this.setState(
      {
        history: [...this.state.history, next],
        currentIndex: this.state.currentIndex + 1,
        data,
        sidebar: null,
      },
      () => body.scrollTo(0, 0)
    );
  };

  _handleBack = () => {
    let body = document.getElementById("slate-client-body");
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop;
    this.state.history[this.state.currentIndex].data = this.state.data; //BUG FIX: if you go back, it doesn't save the data for that page. so if you go forward to it again, it breaks. changed data => this.state.data

    const next = this.state.history[this.state.currentIndex - 1];

    this.setState(
      {
        currentIndex: this.state.currentIndex - 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        body.scrollTo(0, next.scrollTop);
      }
    );
  };

  _handleForward = () => {
    let body = document.getElementById("slate-client-body");
    this.state.history[this.state.currentIndex].scrollTop = body.scrollTop;

    const next = this.state.history[this.state.currentIndex + 1];

    this.setState(
      {
        currentIndex: this.state.currentIndex + 1,
        sidebar: null,
        data: { ...next.data },
      },
      () => {
        console.log({ next });
        body.scrollTo(0, next.scrollTop);
      }
    );
  };

  render() {
    // TODO(colin): Populate this.
    console.log({ analytics: this.props.analytics });

    // NOTE(jim): Not authenticated.
    if (!this.state.viewer) {
      return (
        <WebsitePrototypeWrapper
          title="Slate: sign in"
          description="Sign in to your Slate account to manage your assets."
          url="https://slate.host/_"
        >
          <SceneSignIn
            onAuthenticate={this._handleAuthenticate}
            onNavigateTo={this._handleNavigateTo}
          />
        </WebsitePrototypeWrapper>
      );
    }

    // NOTE(jim): Authenticated.
    const navigation = NavigationData.generate(this.state.viewer);
    const next = this.state.history[this.state.currentIndex];
    const current = NavigationData.getCurrentById(navigation, next.id);
    console.log(this.state.history);

    const navigationElement = (
      <ApplicationNavigation
        viewer={this.state.viewer}
        activeId={current.target.id}
        activeIds={current.activeIds}
        navigation={navigation}
        onNavigateTo={this._handleNavigateTo}
        onAction={this._handleAction}
        onSignOut={this._handleSignOut}
      />
    );

    let headerElement = (
      <ApplicationHeader
        viewer={this.state.viewer}
        pageTitle={current.target.pageTitle}
        currentIndex={this.state.currentIndex}
        onBack={this._handleBack}
        onForward={this._handleForward}
        history={this.state.history}
      />
    );

    if (current.target.decorator === "FILE") {
      headerElement = null;
    }

    const scene = React.cloneElement(
      SCENES[next.scene || current.target.decorator],
      {
        current: current.target,
        data: this.state.data,
        viewer: this.state.viewer,
        selected: this.state.selected,
        onNavigateTo: this._handleNavigateTo,
        onSelectedChange: this._handleSelectedChange,
        onViewerChange: this._handleViewerChange,
        onDeleteYourself: this._handleDeleteYourself,
        onAction: this._handleAction,
        onBack: this._handleBack,
        onForward: this._handleForward,
        onRehydrate: this.rehydrate,
        sceneId: current.target.id,
      }
    );

    let sidebarElement;
    if (this.state.sidebar) {
      sidebarElement = React.cloneElement(this.state.sidebar, {
        selected: this.state.selected,
        viewer: this.state.viewer,
        data: this.state.data,
        fileLoading: this.state.fileLoading,
        sidebarLoading: this.state.sidebarLoading,
        onSelectedChange: this._handleSelectedChange,
        onSubmit: this._handleSubmit,
        onCancel: this._handleCancel,
        onRegisterFile: this._handleRegisterFile,
        onUploadFile: this._handleUploadFile,
        onSidebarLoading: this._handleSidebarLoading,
        onAction: this._handleAction,
        onRehydrate: this.rehydrate,
      });
    }

    const title = `Slate : ${current.target.pageTitle}`;
    const description = "This is an early preview.";
    const url = "https://slate.host/_";

    return (
      <React.Fragment>
        <WebsitePrototypeWrapper
          title={title}
          description={description}
          url={url}
        >
          <ApplicationLayout
            navigation={navigationElement}
            header={headerElement}
            sidebar={sidebarElement}
            onDismissSidebar={this._handleDismissSidebar}
            bodyRef={this._body}
          >
            {scene}
          </ApplicationLayout>
          <System.GlobalCarousel />
        </WebsitePrototypeWrapper>
      </React.Fragment>
    );
  }
}
