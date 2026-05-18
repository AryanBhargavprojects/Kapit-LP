import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { $ as $authStore, c as $csrState, a as $clerk } from "./chunk-IFEBM3MJ_3SR-uljH.mjs";
import React, { useCallback, useSyncExternalStore, useEffect } from "react";
import { computed } from "nanostores";
import { createCheckAuthorization, resolveAuthState } from "@clerk/shared/authorization";
import { deriveState } from "@clerk/shared/deriveState";
import { a as authAsyncStorage } from "./async-local-storage.server_DQ7sHqiS.mjs";
import "@clerk/shared/react";
function useStore(store) {
  const get = store.get.bind(store);
  return React.useSyncExternalStore(store.listen, get, get);
}
var withClerk = (Component, displayName) => {
  displayName = displayName || Component.displayName || Component.name || "Component";
  Component.displayName = displayName;
  const HOC = (props) => {
    const clerk = useStore(
      computed([$csrState, $clerk], (state, clerk2) => {
        return state.isLoaded ? clerk2 : null;
      })
    );
    return /* @__PURE__ */ jsx(
      Component,
      {
        ...props,
        clerk
      },
      clerk ? "a" : "b"
    );
  };
  HOC.displayName = `withClerk(${displayName})`;
  return HOC;
};
var assertSingleChild = (children) => (name) => {
  try {
    return React.Children.only(children);
  } catch {
    return `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`;
  }
};
var normalizeWithDefaultValue = (children, defaultText) => {
  if (!children) {
    children = defaultText;
  }
  if (typeof children === "string") {
    children = /* @__PURE__ */ jsx("button", { type: "button", children });
  }
  return children;
};
var safeExecute = (cb) => (...args) => {
  if (cb && typeof cb === "function") {
    return cb(...args);
  }
};
withClerk(
  ({ clerk, children, ...props }) => {
    const {
      planId,
      planPeriod,
      for: _for,
      onSubscriptionComplete,
      newSubscriptionRedirectUrl,
      checkoutProps,
      ...rest
    } = props;
    children = normalizeWithDefaultValue(children, "Checkout");
    const child = assertSingleChild(children)("CheckoutButton");
    const clickHandler = () => {
      if (!clerk) {
        return;
      }
      return clerk.__internal_openCheckout({
        planId,
        planPeriod,
        for: _for,
        onSubscriptionComplete,
        newSubscriptionRedirectUrl,
        ...checkoutProps
      });
    };
    const wrappedChildClickHandler = (e) => {
      if (child && typeof child === "object" && "props" in child) {
        void safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "CheckoutButton"
);
withClerk(
  ({ clerk, children, ...props }) => {
    const { plan, planId, initialPlanPeriod, planDetailsProps, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Plan details");
    const child = assertSingleChild(children)("PlanDetailsButton");
    const clickHandler = () => {
      if (!clerk) {
        return;
      }
      return clerk.__internal_openPlanDetails({
        plan,
        planId,
        initialPlanPeriod,
        ...planDetailsProps
      });
    };
    const wrappedChildClickHandler = (e) => {
      if (child && typeof child === "object" && "props" in child) {
        void safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "PlanDetailsButton"
);
var SignInButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { signUpFallbackRedirectUrl, forceRedirectUrl, fallbackRedirectUrl, signUpForceRedirectUrl, mode, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign in");
    const child = assertSingleChild(children)("SignInButton");
    const clickHandler = () => {
      const opts = {
        forceRedirectUrl,
        fallbackRedirectUrl,
        signUpFallbackRedirectUrl,
        signUpForceRedirectUrl
      };
      if (!clerk) {
        return;
      }
      if (mode === "modal") {
        return clerk.openSignIn({ ...opts, appearance: props.appearance });
      }
      return clerk.redirectToSignIn({
        ...opts,
        signInFallbackRedirectUrl: fallbackRedirectUrl,
        signInForceRedirectUrl: forceRedirectUrl
      });
    };
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "SignInButton"
);
withClerk(
  ({ clerk, children, ...props }) => {
    const { redirectUrl = "/", sessionId, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign out");
    const child = assertSingleChild(children)("SignOutButton");
    const clickHandler = () => clerk?.signOut({ redirectUrl, sessionId });
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "SignOutButton"
);
var SignUpButton = withClerk(
  ({ clerk, children, ...props }) => {
    const { fallbackRedirectUrl, forceRedirectUrl, signInFallbackRedirectUrl, signInForceRedirectUrl, mode, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Sign up");
    const child = assertSingleChild(children)("SignUpButton");
    const clickHandler = () => {
      const opts = {
        fallbackRedirectUrl,
        forceRedirectUrl,
        signInFallbackRedirectUrl,
        signInForceRedirectUrl
      };
      if (!clerk) {
        return;
      }
      if (mode === "modal") {
        return clerk.openSignUp({
          ...opts,
          appearance: props.appearance,
          unsafeMetadata: props.unsafeMetadata
        });
      }
      return clerk.redirectToSignUp({
        ...opts,
        signUpFallbackRedirectUrl: fallbackRedirectUrl,
        signUpForceRedirectUrl: forceRedirectUrl
      });
    };
    const wrappedChildClickHandler = async (e) => {
      if (child && typeof child === "object" && "props" in child) {
        await safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "SignUpButton"
);
withClerk(
  ({
    clerk,
    children,
    ...props
  }) => {
    const { for: _for, subscriptionDetailsProps, onSubscriptionCancel, ...rest } = props;
    children = normalizeWithDefaultValue(children, "Subscription details");
    const child = assertSingleChild(children)("SubscriptionDetailsButton");
    const clickHandler = () => {
      if (!clerk) {
        return;
      }
      return clerk.__internal_openSubscriptionDetails({
        for: _for,
        onSubscriptionCancel,
        ...subscriptionDetailsProps
      });
    };
    const wrappedChildClickHandler = (e) => {
      if (child && typeof child === "object" && "props" in child) {
        void safeExecute(child.props.onClick)(e);
      }
      return clickHandler();
    };
    const childProps = { ...rest, onClick: wrappedChildClickHandler };
    return React.cloneElement(child, childProps);
  },
  "SubscriptionDetailsButton"
);
var isMountProps = (props) => {
  return "mount" in props;
};
var isOpenProps = (props) => {
  return "open" in props;
};
var Portal = class extends React.PureComponent {
  portalRef = React.createRef();
  componentDidUpdate(prevProps) {
    if (!isMountProps(prevProps) || !isMountProps(this.props)) {
      return;
    }
    if (prevProps.props.appearance !== this.props.props.appearance || prevProps.props?.customPages?.length !== this.props.props?.customPages?.length) {
      this.props.updateProps?.({
        node: this.portalRef.current,
        props: this.props.props
      });
    }
  }
  componentDidMount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.mount?.(this.portalRef.current, this.props.props);
      }
      if (isOpenProps(this.props)) {
        this.props.open?.(this.props.props);
      }
    }
  }
  componentWillUnmount() {
    if (this.portalRef.current) {
      if (isMountProps(this.props)) {
        this.props.unmount?.(this.portalRef.current);
      }
      if (isOpenProps(this.props)) {
        this.props.close?.();
      }
    }
  }
  render() {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { ref: this.portalRef }) });
  }
};
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountSignIn,
      unmount: clerk?.unmountSignIn,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "SignIn");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountSignUp,
      unmount: clerk?.unmountSignUp,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "SignUp");
var UserButton = withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountUserButton,
      unmount: clerk?.unmountUserButton,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "UserButton");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountUserProfile,
      unmount: clerk?.unmountUserProfile,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "UserProfile");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationProfile,
      unmount: clerk?.unmountOrganizationProfile,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "OrganizationProfile");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationSwitcher,
      unmount: clerk?.unmountOrganizationSwitcher,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "OrganizationSwitcher");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOrganizationList,
      unmount: clerk?.unmountOrganizationList,
      updateProps: clerk?.__internal_updateProps,
      props
    }
  );
}, "OrganizationList");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      open: clerk?.openGoogleOneTap,
      close: clerk?.closeGoogleOneTap,
      props
    }
  );
}, "GoogleOneTap");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountWaitlist,
      unmount: clerk?.unmountWaitlist,
      props
    }
  );
}, "Waitlist");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountPricingTable,
      unmount: clerk?.unmountPricingTable,
      props
    }
  );
}, "PricingTable");
withClerk(({ clerk, ...props }) => {
  return /* @__PURE__ */ jsx(
    Portal,
    {
      mount: clerk?.mountOAuthConsent,
      unmount: clerk?.unmountOAuthConsent,
      props
    }
  );
}, "OAuthConsent");
var clerkLoaded = () => {
  return new Promise((resolve) => {
    $csrState.subscribe(({ isLoaded }) => {
      if (isLoaded) {
        resolve($clerk.get());
      }
    });
  });
};
var createGetToken = () => {
  return async (options) => {
    const clerk = await clerkLoaded();
    if (!clerk.session) {
      return null;
    }
    return clerk.session.getToken(options);
  };
};
var createSignOut = () => {
  return async (...args) => {
    const clerk = await clerkLoaded();
    return clerk.signOut(...args);
  };
};
var useAuth = ({ treatPendingAsSignedOut } = {}) => {
  const authContext = useAuthStore();
  const getToken = useCallback(createGetToken(), []);
  const signOut = useCallback(createSignOut(), []);
  const { userId, orgId, orgRole, orgPermissions, factorVerificationAge, sessionClaims } = authContext;
  const has = useCallback(
    (params) => {
      return createCheckAuthorization({
        userId,
        orgId,
        orgRole,
        orgPermissions,
        factorVerificationAge,
        features: sessionClaims?.fea || "",
        plans: sessionClaims?.pla || ""
      })(params);
    },
    [userId, orgId, orgRole, orgPermissions, factorVerificationAge, sessionClaims]
  );
  const payload = resolveAuthState({
    authObject: {
      ...authContext,
      getToken,
      signOut,
      has
    },
    options: {
      treatPendingAsSignedOut
    }
  });
  if (!payload) {
    throw new Error("Invalid state. Feel free to submit a bug or reach out to support");
  }
  return payload;
};
function useStore2(store, getServerSnapshot) {
  const get = store.get.bind(store);
  return useSyncExternalStore(store.listen, get, getServerSnapshot || get);
}
function useAuthStore() {
  const get = $authStore.get.bind($authStore);
  return useStore2($authStore, () => {
    if (typeof window === "undefined") {
      return deriveState(
        false,
        {
          user: null,
          session: null,
          client: null,
          organization: null
        },
        authAsyncStorage.getStore()
      );
    }
    return get();
  });
}
computed($csrState, (state) => state.isLoaded);
withClerk(
  ({ clerk, ...handleRedirectCallbackParams }) => {
    useEffect(() => {
      void clerk?.handleRedirectCallback(handleRedirectCallbackParams);
    }, []);
    return null;
  },
  "AuthenticateWithRedirectCallback"
);
function NavbarAuthActions() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return /* @__PURE__ */ jsx("div", { className: "w-32 h-8 bg-[#1C1C1C] rounded-full animate-pulse" });
  }
  if (isSignedIn) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/dashboard",
          className: "inline-flex items-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-[#8B5CF6] transition-colors",
          children: "Dashboard"
        }
      ),
      /* @__PURE__ */ jsx(UserButton, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(SignInButton, { mode: "modal", children: /* @__PURE__ */ jsx("button", { className: "text-sm text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer", children: "Sign In" }) }),
    /* @__PURE__ */ jsx(SignUpButton, { mode: "modal", children: /* @__PURE__ */ jsx("button", { className: "inline-flex items-center bg-[#7C3AED] text-white font-semibold text-sm px-4 py-1.5 rounded-lg hover:bg-[#8B5CF6] transition-colors cursor-pointer", children: "Get API Key" }) })
  ] });
}
const BASE_URL = "http://localhost:8000";
class KapitDashboardApiError extends Error {
  status;
  code;
  recovery;
  alternativeAction;
  retryAfterSeconds;
  rateLimitContext;
  constructor(status, code, message, extras) {
    super(message);
    this.name = "KapitDashboardApiError";
    this.status = status;
    this.code = code;
    if (extras?.recovery !== void 0) this.recovery = extras.recovery;
    if (extras?.alternativeAction !== void 0) this.alternativeAction = extras.alternativeAction;
    if (extras?.retryAfterSeconds !== void 0) this.retryAfterSeconds = extras.retryAfterSeconds;
    if (extras?.rateLimitContext !== void 0) this.rateLimitContext = extras.rateLimitContext;
  }
}
function parseRetryAfterHeader(header) {
  if (!header) return void 0;
  const seconds = parseInt(header, 10);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;
  return void 0;
}
async function request(token, method, path, body) {
  if (!token) {
    throw new KapitDashboardApiError(0, "no_token", "Missing Clerk session token.");
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json"
  };
  if (body !== void 0) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== void 0 ? JSON.stringify(body) : void 0
  });
  if (!response.ok) {
    let code = "request_failed";
    let message = `Request failed with status ${response.status}`;
    let recovery;
    let alternativeAction;
    let retryAfterSeconds;
    let rateLimitContext;
    try {
      const data = await response.json();
      if (typeof data.error?.code === "string") code = data.error.code;
      if (typeof data.error?.message === "string") message = data.error.message;
      if (typeof data.error?.recovery?.guidance === "string") recovery = data.error.recovery.guidance;
      if (typeof data.error?.alternative_action === "string") alternativeAction = data.error.alternative_action;
      if (typeof data.error?.retry_after_seconds === "number") retryAfterSeconds = data.error.retry_after_seconds;
      if (typeof data.error?.context?.rate_limit === "string") rateLimitContext = data.error.context.rate_limit;
    } catch {
    }
    if (response.status === 429 && retryAfterSeconds === void 0) {
      retryAfterSeconds = parseRetryAfterHeader(response.headers.get("Retry-After"));
    }
    if (response.status === 404 || response.status === 501) {
      throw new KapitDashboardApiError(
        response.status,
        "not_ready",
        "Endpoint is not available yet."
      );
    }
    throw new KapitDashboardApiError(response.status, code, message, {
      recovery,
      alternativeAction,
      retryAfterSeconds,
      rateLimitContext
    });
  }
  if (response.status === 204) {
    return void 0;
  }
  return await response.json();
}
function getAccountMe(token) {
  return request(token, "GET", "/v1/account/me");
}
function getAccountUsage(token) {
  return request(token, "GET", "/v1/account/usage");
}
async function getAccountUsageWithMeta(token) {
  if (!token) {
    throw new KapitDashboardApiError(0, "no_token", "Missing Clerk session token.");
  }
  const response = await fetch(`${BASE_URL}/v1/account/usage`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    let code = "request_failed";
    let message = `Request failed with status ${response.status}`;
    let recovery;
    let alternativeAction;
    let retryAfterSeconds;
    let rateLimitContext;
    try {
      const data2 = await response.json();
      if (typeof data2.error?.code === "string") code = data2.error.code;
      if (typeof data2.error?.message === "string") message = data2.error.message;
      if (typeof data2.error?.recovery?.guidance === "string") recovery = data2.error.recovery.guidance;
      if (typeof data2.error?.alternative_action === "string") alternativeAction = data2.error.alternative_action;
      if (typeof data2.error?.retry_after_seconds === "number") retryAfterSeconds = data2.error.retry_after_seconds;
      if (typeof data2.error?.context?.rate_limit === "string") rateLimitContext = data2.error.context.rate_limit;
    } catch {
    }
    if (response.status === 429 && retryAfterSeconds === void 0) {
      retryAfterSeconds = parseRetryAfterHeader(response.headers.get("Retry-After"));
    }
    if (response.status === 404 || response.status === 501) {
      throw new KapitDashboardApiError(
        response.status,
        "not_ready",
        "Endpoint is not available yet."
      );
    }
    throw new KapitDashboardApiError(response.status, code, message, {
      recovery,
      alternativeAction,
      retryAfterSeconds,
      rateLimitContext
    });
  }
  const json = await response.json();
  const { meta, ...usageFields } = json;
  const data = {
    plan: usageFields.plan,
    period: usageFields.period,
    used: usageFields.used,
    limit: usageFields.limit,
    reset_at: usageFields.reset_at,
    rate_limit: usageFields.rate_limit,
    overage_units: usageFields.overage_units,
    estimated_overage_cost_cents: usageFields.estimated_overage_cost_cents
  };
  const warning = meta && meta.warning && typeof meta.warning === "object" ? meta.warning : null;
  return { data, warning };
}
function listApiKeys(token) {
  return request(token, "GET", "/v1/account/api-keys");
}
function createApiKey(token, input) {
  return request(token, "POST", "/v1/account/api-keys", input);
}
async function revokeApiKey(token, keyId) {
  await request(
    token,
    "DELETE",
    `/v1/account/api-keys/${encodeURIComponent(keyId)}`
  );
}
function createCheckout(token, input) {
  return request(token, "POST", "/v1/billing/checkout", input);
}
function createCustomerPortal(token, input) {
  return request(token, "POST", "/v1/billing/customer-portal", input);
}
export {
  KapitDashboardApiError as K,
  NavbarAuthActions as N,
  SignInButton as S,
  createCheckout as a,
  createCustomerPortal as b,
  createApiKey as c,
  getAccountUsage as d,
  getAccountUsageWithMeta as e,
  getAccountMe as g,
  listApiKeys as l,
  revokeApiKey as r,
  useAuth as u
};
