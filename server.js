import * as Environment from "~/node_common/environment";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Serializers from "~/node_common/serializers";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as Websocket from "~/node_common/nodejs-websocket";
import * as Logging from "~/common/logging";
import * as Validations from "~/common/validations";
import * as Window from "~/common/window";
import * as Strings from "~/common/strings";
import * as NavigationData from "~/common/navigation-data";

import limit from "express-rate-limit";
import express from "express";
import next from "next";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { FilecoinNumber, Converter } from "@glif/filecoin-number";

const app = next({
  dev: !Environment.IS_PRODUCTION,
  dir: __dirname,
  quiet: false,
});

const createLimiter = limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    decorator: "SIGN_UP_RATE_LIMITED",
    error: true,
    message: "You have made too many requests.",
  },
});

const loginLimiter = limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: {
    decorator: "SIGN_IN_RATE_LIMITED",
    error: true,
    message: "You have made too many requests.",
  },
});

const handler = app.getRequestHandler();

const EXTERNAL_RESOURCES = {
  storageDealUpload: Strings.isEmpty(Environment.RESOURCE_URI_STORAGE_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  upload: Strings.isEmpty(Environment.RESOURCE_URI_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  uploadZip: Strings.isEmpty(Environment.RESOURCE_URI_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  download: Strings.isEmpty(Environment.RESOURCE_URI_UPLOAD)
    ? null
    : Environment.RESOURCE_URI_STORAGE_UPLOAD,
  pubsub: Strings.isEmpty(Environment.RESOURCE_URI_PUBSUB) ? null : Environment.RESOURCE_URI_PUBSUB,
  search: Strings.isEmpty(Environment.RESOURCE_URI_SEARCH) ? null : Environment.RESOURCE_URI_SEARCH,
};

let exploreSlates = [];

const fetchExploreSlates = async () => {
  let exploreSlates = [];
  if (Environment.IS_PRODUCTION) {
    exploreSlates = await Data.getSlatesByIds({
      ids: [
        //NOTE(tara): slates in prod
        "d2861ac4-fc41-4c07-8f21-d0bf06be364c",
        "9c2c458c-d92a-4e81-a4b6-bf6ab4607470",
        "7f461144-0647-43d7-8294-788b37ae5979",
        "f72c2594-b8ac-41f6-91e0-b2da6788ae23",
        "a0d6e2f2-564d-47ed-bf56-13c42634703d",
        "0ba92c73-92e7-4b00-900e-afae4856c9ea",
      ],
      includeFiles: true,
      sanitize: true,
    });

    for (let exploreSlate of exploreSlates) {
      let user = await Data.getUserById({
        id: exploreSlate.ownerId,
        sanitize: true,
      });
      exploreSlate.username = user.username;
    }
  }
  // else {
  //   exploreSlates = await Data.getSlatesByIds({
  //     ids: [
  //       //NOTE(tara): slates in localhost for testing
  //       "857ad84d-7eff-4861-a988-65c84b62fc23",
  //       "81fa0b39-0e96-4c7f-8587-38468bb67cb3",
  //       "c4e8dad7-4ba0-4f25-a92a-c73ef5522d29",
  //       "df05cb1f-2ecf-4872-b111-c4b8493d08f8",
  //       "435035e6-dee4-4bbf-9521-64c219a527e7",
  //       "ac907aa3-2fb2-46fd-8eba-ec8ceb87b5eb",
  //     ],
  //     includeFiles: true,
  //     sanitize: true,
  //   });

  //   for (let exploreSlate of exploreSlates) {
  //     let user = await Data.getUserById({ id: exploreSlate.ownerId });
  //     exploreSlate.username = user.username;
  //   }
  // }
  return exploreSlates;
};

app.prepare().then(async () => {
  const server = express();

  server.use(cors());
  server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

  if (Environment.IS_PRODUCTION) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));
  server.get("/service-worker.js", express.static(path.join(__dirname, ".next")));
  server.get("/system", async (r, s) => s.redirect("/_/system"));
  server.get("/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/_/experiences", async (r, s) => s.redirect("/_/system"));
  server.get("/system/:c", async (r, s) => s.redirect(`/_/system/${r.params.c}`));
  server.get("/experiences/:m", async (r, s) => s.redirect(`/_/experiences/${r.params.m}`));

  server.all("/api/users/create", createLimiter, async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/sign-in", loginLimiter, async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/:a", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.all("/api/:a/:b", async (r, s, next) => {
    return handler(r, s, r.url);
  });

  server.get("/", async (req, res) => {
    return app.render(req, res, "/", {});
  });

  server.get("/_", async (req, res) => {
    return res.redirect("/_/activity");
    // let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
    // let isMac = Window.isMac(req.headers["user-agent"]);

    // const isBucketsAvailable = await Utilities.checkTextile();

    // if (!isBucketsAvailable && Environment.IS_PRODUCTION) {
    //   return res.redirect("/maintenance");
    // }

    // const id = Utilities.getIdFromCookie(req);

    // let viewer = null;
    // if (id) {
    //   viewer = await Data.getUserById({
    //     id,
    //   });
    // }

    // if (viewer) {
    //   return res.redirect("/_/data");
    // } else {
    //   return res.redirect("/_/activity");
    // }

    // let page = NavigationData.getById(null, viewer);

    // return app.render(req, res, "/_", {
    //   viewer,
    //   isMobile,
    //   isMac,
    //   page,
    //   data: null,
    //   resources: EXTERNAL_RESOURCES,
    // });
  });

  server.get("/_/:scene", async (req, res) => {
    let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
    let isMac = Window.isMac(req.headers["user-agent"]);

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    let { page, redirected } = NavigationData.getByHref(req.path, viewer);
    if (redirected) {
      return res.redirect(page.pathname);
    }
    // if (!redirected) {
    page.params = req.query;
    // }

    if (!page) {
      return handler(req, res, req.url, {
        isMobile,
        resources: EXTERNAL_RESOURCES,
      });
    }

    return app.render(req, res, "/_", {
      isMobile,
      isMac,
      viewer,
      page,
      data: null,
      resources: EXTERNAL_RESOURCES,
    });
  });

  server.all("/_/:a", async (r, s) => handler(r, s, r.url));
  server.all("/_/:a/:b", async (r, s) => handler(r, s, r.url));

  server.get("/[$]/slate/:id", async (req, res) => {
    const slate = await Data.getSlateById({
      id: req.params.id,
    });

    if (!slate || slate.error) {
      return res.redirect("/_/404");
    }

    const creator = await Data.getUserById({
      id: slate.ownerId,
    });

    if (!creator || creator.error) {
      return res.redirect("/_/404");
    }

    let search = Strings.getQueryStringFromParams(req.query);

    return res.redirect(`/${creator.username}/${slate.slatename}${search}`);
  });

  server.get("/[$]/user/:id", async (req, res) => {
    const creator = await Data.getUserById({
      id: req.params.id,
    });

    if (!creator || creator.error) {
      return res.redirect("/_/404");
    }

    let search = Strings.getQueryStringFromParams(req.query);

    return res.redirect(`/${creator.username}${search}`);
  });

  server.get("/[$]/:id", async (req, res) => {
    const slate = await Data.getSlateById({
      id: req.params.id,
    });

    if (!slate || slate.error) {
      return res.redirect("/_/404");
    }

    const creator = await Data.getUserById({
      id: slate.ownerId,
    });

    if (!creator || creator.error) {
      return res.redirect("/_/404");
    }

    let search = Strings.getQueryStringFromParams(req.query);

    return res.redirect(`/${creator.username}/${slate.slatename}${search}`);
  });

  server.get("/:username", async (req, res) => {
    const username = req.params.username.toLowerCase();
    let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
    let isMac = Window.isMac(req.headers["user-agent"]);

    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(username)) {
      return handler(req, res, req.url, {
        isMobile,
        resources: EXTERNAL_RESOURCES,
      });
    }

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    let { page, redirected } = NavigationData.getByHref(req.path, viewer);
    if (!redirected) {
      page.params = req.query;
    }

    let user = await Data.getUserByUsername({
      username,
      includeFiles: true,
      sanitize: true,
      publicOnly: true,
    });

    if (!user) {
      return res.redirect("/_/404");
    }

    if (user.error) {
      return res.redirect("/_/404");
    }

    const slates = await Data.getSlatesByUserId({
      ownerId: user.id,
      sanitize: true,
      includeFiles: true,
      publicOnly: true,
    });

    user.slates = slates;

    return app.render(req, res, "/_", {
      viewer,
      isMobile,
      isMac,
      data: user,
      page,
      resources: EXTERNAL_RESOURCES,
    });
  });

  // server.get("/:username/cid::cid", async (req, res) => {
  //   const username = req.params.username.toLowerCase();
  //   const cid = req.params.cid.toLowerCase();

  //   let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
  //   let isMac = Window.isMac(req.headers["user-agent"]);

  //   // TODO(jim): Temporary workaround
  //   if (!Validations.userRoute(username)) {
  //     return handler(req, res, req.url);
  //   }

  //   const id = Utilities.getIdFromCookie(req);

  //   let user = await Data.getUserByUsername({
  //     username,
  //     includeFiles: true,
  //     sanitize: true,
  //     publicOnly: true,
  //   });

  //   if (!user) {
  //     return res.redirect("/_/404");
  //   }

  //   if (user.error) {
  //     return res.redirect("/_/404");
  //   }

  //   const slates = await Data.getSlatesByUserId({
  //     ownerId: user.id,
  //     sanitize: true,
  //     includeFiles: true,
  //     publicOnly: true,
  //   });

  //   user.slates = slates;

  //   let viewer = null;
  //   if (id) {
  //     viewer = await ViewerManager.getById({
  //       id,
  //     });
  //   }

  //   let page = NavigationData.getById("NAV_PROFILE", viewer);
  //   page = { ...page, cid };

  //   return app.render(req, res, "/_", {
  //     viewer,
  //     isMobile,
  //     isMac,
  //     page,
  //     data: user,
  //     resources: EXTERNAL_RESOURCES,
  //   });
  // });

  server.get("/:username/:slatename", async (req, res) => {
    const username = req.params.username.toLowerCase();
    const slatename = req.params.slatename.toLowerCase();

    let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
    let isMac = Window.isMac(req.headers["user-agent"]);

    // TODO(jim): Temporary workaround
    if (!Validations.userRoute(username)) {
      return handler(req, res, req.url, {
        isMobile,
        resources: EXTERNAL_RESOURCES,
      });
    }

    const id = Utilities.getIdFromCookie(req);

    let viewer = null;
    if (id) {
      viewer = await ViewerManager.getById({
        id,
      });
    }

    let { page, redirected } = NavigationData.getByHref(req.path, viewer);
    if (!redirected) {
      page.params = req.query;
    }

    const slate = await Data.getSlateByName({
      slatename,
      username,
      includeFiles: true,
      sanitize: true,
    });

    if (!slate || slate.error || (!slate.isPublic && slate.ownerId !== id)) {
      return res.redirect("/_/404");
    }

    const user = await Data.getUserById({
      id: slate.ownerId,
      sanitize: true,
    });

    if (!user) {
      return res.redirect("/_/404");
    }

    if (user.error) {
      return res.redirect("/_/404");
    }

    slate.user = user;

    return app.render(req, res, "/_", {
      viewer,
      isMobile,
      isMac,
      data: slate,
      page,
      resources: EXTERNAL_RESOURCES,
    });
  });

  // server.get("/:username/:slatename/cid::cid", async (req, res) => {
  //   const username = req.params.username.toLowerCase();
  //   const slatename = req.params.slatename.toLowerCase();
  //   const cid = req.params.cid.toLowerCase();

  //   let isMobile = Window.isMobileBrowser(req.headers["user-agent"]);
  //   let isMac = Window.isMac(req.headers["user-agent"]);

  //   // TODO(jim): Temporary workaround
  //   if (!Validations.userRoute(username)) {
  //     return handler(req, res, req.url);
  //   }

  //   const id = Utilities.getIdFromCookie(req);

  //   const slate = await Data.getSlateByName({
  //     slatename,
  //     username,
  //     includeFiles: true,
  //     sanitize: true,
  //   });

  //   if (!slate) {
  //     return res.redirect("/_/404");
  //   }

  //   if (slate.error || !slate.isPublic && slate.ownerId !== id) {
  //     return res.redirect("/_/404");
  //   }

  //   const user = await Data.getUserById({
  //     id: slate.ownerId,
  //     sanitize: true,
  //   });

  //   if (!user) {
  //     return res.redirect("/_/404");
  //   }

  //   if (user.error) {
  //     return res.redirect("/_/404");
  //   }

  //   let viewer = null;
  //   if (id) {
  //     viewer = await ViewerManager.getById({
  //       id,
  //     });
  //   }

  //   slate.user = user;

  //   let page = NavigationData.getById("NAV_SLATE", viewer);
  //   page = { ...page, cid };

  //   return app.render(req, res, "/_", {
  //     viewer,
  //     isMobile,
  //     isMac,
  //     data: slate,
  //     page,
  //     resources: EXTERNAL_RESOURCES,
  //   });
  // });

  server.all("*", async (r, s) => handler(r, s, r.url));

  const listenServer = server.listen(Environment.PORT, async (e) => {
    if (e) throw e;
    Websocket.create();

    Logging.log(`started on http://localhost:${Environment.PORT}`);

    exploreSlates = await fetchExploreSlates();

    const filecoinNumber = new FilecoinNumber("10000", "attoFil");

    Logging.log(`Testing Values: ${filecoinNumber.toPicoFil()} PICO FIL`);
    Logging.log(`Testing Values: ${filecoinNumber.toAttoFil()} ATTO FIL`);
    Logging.log(`Testing Values: ${filecoinNumber.toFil()} FIL`);
  });
});
