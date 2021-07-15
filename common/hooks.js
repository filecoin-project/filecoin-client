import * as React from "react";
import * as Logging from "~/common/logging";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";

export const useMounted = () => {
  const isMounted = React.useRef(true);
  React.useLayoutEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
};

/** NOTE(amine):
 * useForm handles three main responsabilities
 *  - control inputs
 *  - control form
 *  - add validations
 *
 *  For validations
 *  - Validate each field when onBlur event is triggered
 *  - Validate all fields before submit
 *  - font submit if there is errors
 */

export const useForm = ({
  onSubmit,
  validate,
  initialValues,
  validateOnBlur = true,
  validateOnSubmit = true,
}) => {
  const [internal, setInternal] = React.useState({ isSubmitting: false, isValidating: false });
  const [state, setState] = React.useState({
    isSubmitting: false,
    values: initialValues,
    errors: {},
    touched: {},
  });

  const _hasError = (obj) => Object.keys(obj).some((name) => obj[name]);
  const _mergeEventHandlers =
    (events = []) =>
    (e) =>
      events.forEach((event) => {
        if (event) event(e);
      });

  /** ---------- NOTE(amine): Input Handlers ---------- */
  const handleFieldChange = (e) =>
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [e.target.name]: e.target.value },
      errors: { ...prev.errors, [e.target.name]: undefined },
      touched: { ...prev.touched, [e.target.name]: false },
    }));

  const handleOnBlur = async (e) => {
    // NOTE(amine): validate the inputs onBlur and touch the current input
    let errors = {};
    if (validateOnBlur && validate) {
      try {
        setInternal((prev) => ({ ...prev, isValidating: true }));
        errors = await validate(state.values, {});
      } catch (e) {
        Logging.error(e);
      } finally {
        setInternal((prev) => ({ ...prev, isValidating: false }));
        setState((prev) => ({
          ...prev,
          touched: { ...prev.touched, [e.target.name]: validateOnBlur },
          errors,
        }));
      }
    }
  };

  // Note(Amine): this prop getter will capture the field state
  const getFieldProps = (name, { onChange, onBlur, error } = {}) => ({
    name: name,
    value: state.values[name],
    error: error || state.errors[name],
    touched: state.touched[name],
    onChange: _mergeEventHandlers([onChange, handleFieldChange]),
    onBlur: _mergeEventHandlers([onBlur, handleOnBlur]),
  });

  /** ---------- NOTE(amine): Form Handlers ----------  */

  const submitAsync = async () => {
    // NOTE(amine): Don't submit if the form is validating or already submitting
    if (internal.isSubmitting || internal.isValidating) return;

    //NOTE(amine): touch all inputs
    setState((prev) => {
      const touched = Object.keys(prev.values).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      return { ...prev, touched };
    });

    // NOTE(amine): validate inputs
    if (validateOnSubmit && validate) {
      let errors = {};
      try {
        setInternal((prev) => ({ ...prev, isValidating: true }));
        errors = await validate(state.values, { ...state.errors });
        if (_hasError(errors)) return;
      } catch (e) {
        Logging.error(e);
      } finally {
        setInternal((prev) => ({ ...prev, isValidating: false }));
        setState((prev) => ({ ...prev, errors }));
      }
    }

    // NOTE(amine): submit the form
    if (!onSubmit) return;
    setInternal((prev) => ({ ...prev, isSubmitting: true }));
    try {
      await onSubmit(state.values);
    } catch (e) {
      Logging.error(e);
    } finally {
      setInternal((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleFormOnSubmit = (e) => {
    e.preventDefault();
    submitAsync()
      .then()
      .catch((e) => Logging.error(e));
  };

  // Note(Amine): this prop getter will overide the form onSubmit handler
  const getFormProps = () => ({
    onSubmit: handleFormOnSubmit,
  });

  return {
    getFieldProps,
    getFormProps,
    values: state.values,
    isSubmitting: internal.isSubmitting,
    isValidating: internal.isValidating,
  };
};

/** NOTE(amine): Since we can use on our design system an input onSubmit,
 *               useField is a special case of useForm
 */
export const useField = ({
  onSubmit,
  validate,
  initialValue,
  onChange,
  onBlur,
  validateOnBlur = true,
  validateOnSubmit = true,
}) => {
  const [state, setState] = React.useState({
    isSubmitting: false,
    value: initialValue,
    error: undefined,
    touched: undefined,
  });

  const _mergeEventHandlers =
    (events = []) =>
    (e) =>
      events.forEach((event) => {
        if (event) event(e);
      });

  /** ---------- NOTE(amine): Input Handlers ---------- */
  const handleFieldChange = (e) =>
    setState((prev) => ({
      ...prev,
      value: e.target.value,
      error: undefined,
      touched: false,
    }));

  const handleOnBlur = () => {
    // NOTE(amine): validate the inputs onBlur and touch the current input
    let error = {};
    if (validateOnBlur && validate) error = validate(state.value);
    setState((prev) => ({ ...prev, touched: validateOnBlur, error }));
  };

  const handleFormOnSubmit = () => {
    //NOTE(amine): touch all inputs
    setState((prev) => ({ ...prev, touched: true }));

    // NOTE(amine): validate inputs
    if (validateOnSubmit && validate) {
      const error = validate(state.value);
      setState((prev) => ({ ...prev, error }));
      if (error) return;
    }

    // NOTE(amine): submit the form
    if (!onSubmit) return;
    setState((prev) => ({ ...prev, isSubmitting: true }));
    onSubmit(state.value)
      .then(() => {
        setState((prev) => ({ ...prev, isSubmitting: false }));
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isSubmitting: false }));
      });
  };

  // Note(Amine): this prop getter will capture the field state
  const getFieldProps = (name) => ({
    name: name,
    value: state.value,
    error: state.error,
    touched: state.touched,
    onChange: _mergeEventHandlers([onChange, handleFieldChange]),
    onBlur: _mergeEventHandlers([onBlur, handleOnBlur]),
    onSubmit: handleFormOnSubmit,
  });

  return { getFieldProps, value: state.value, isSubmitting: state.isSubmitting };
};

export const useIntersection = ({ onIntersect, ref }, dependencies = []) => {
  // NOTE(amine): fix for stale closure caused by hooks
  const onIntersectRef = React.useRef();
  onIntersectRef.current = onIntersect;

  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (onIntersectRef.current) onIntersectRef.current(lazyObserver, ref);
        }
      });
    });
    // start to observe element
    lazyObserver.observe(ref.current);
    return () => lazyObserver.unobserve(ref.current);
  }, dependencies);
};

// NOTE(amine): the intersection will be called one time
export const useInView = ({ ref }) => {
  const [isInView, setInView] = React.useState(false);
  useIntersection({
    ref,
    onIntersect: (lazyObserver, ref) => {
      setInView(true);
      lazyObserver.unobserve(ref.current);
    },
  });
  return { isInView };
};

// NOTE(amine): manage like state
export const useLikeHandler = ({ file, viewer }) => {
  const likedFile = React.useMemo(() => viewer?.likes?.find((item) => item.id === file.id), []);
  const [state, setState] = React.useState({
    isLiked: !!likedFile,
    // NOTE(amine): viewer will have the hydrated state
    likeCount: likedFile?.likeCount ?? file.likeCount,
  });

  const handleLikeState = () => {
    setState((prev) => {
      if (prev.isLiked) {
        return {
          isLiked: false,
          likeCount: prev.likeCount - 1,
        };
      }
      return {
        isLiked: true,
        likeCount: prev.likeCount + 1,
      };
    });
  };
  const like = async () => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }
    // NOTE(amine): optimistic update
    handleLikeState();
    const response = await Actions.like({ id: file.id });
    if (Events.hasError(response)) {
      // NOTE(amine): revert back to old state if there is an error
      handleLikeState();
      return;
    }
  };

  return { like, ...state };
};

// NOTE(amine): manage file saving state
export const useSaveHandler = ({ file, viewer }) => {
  const savedFile = React.useMemo(() => viewer?.libraryCids[file.cid], [viewer]);
  const [state, setState] = React.useState({
    isSaved: !!savedFile,
    // NOTE(amine): viewer will have the hydrated state
    saveCount: file.saveCount,
  });

  const handleSaveState = () => {
    setState((prev) => {
      if (prev.isSaved) {
        return {
          isSaved: false,
          saveCount: prev.saveCount - 1,
        };
      }
      return {
        isSaved: true,
        saveCount: prev.saveCount + 1,
      };
    });
  };

  const save = async () => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }
    // NOTE(amine): optimistic update
    handleSaveState();
    const response =
      state.isSaved && savedFile
        ? await Actions.deleteFiles({ ids: [savedFile.id] })
        : await Actions.saveCopy({ files: [file] });
    if (Events.hasError(response)) {
      // NOTE(amine): revert back to old state if there is an error
      handleSaveState();
      return;
    }
  };

  return { save, ...state };
};

export const useFollowProfileHandler = ({ user, viewer, onAction }) => {
  const [isFollowing, setFollowing] = React.useState(
    !viewer
      ? false
      : !!viewer?.following.some((entry) => {
          return entry.id === user.id;
        })
  );

  const handleFollow = async (userId) => {
    if (!viewer) {
      Events.dispatchCustomEvent({ name: "slate-global-open-cta", detail: {} });
      return;
    }

    setFollowing((prev) => !prev);
    const response = await Actions.createSubscription({
      userId,
    });

    if (Events.hasError(response)) {
      setFollowing((prev) => !prev);
      return;
    }

    onAction({
      type: "UPDATE_VIEWER",
      viewer: {
        following: isFollowing
          ? viewer.following.filter((user) => user.id !== userId)
          : viewer.following.concat([
              {
                id: user.id,
                data: user.data,
                fileCount: user.fileCount,
                followerCount: user.followerCount + 1,
                slateCount: user.slateCount,
                username: user.username,
              },
            ]),
      },
    });
  };

  return { handleFollow, isFollowing };
};
