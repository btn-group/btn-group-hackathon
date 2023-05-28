import { HELPERS } from "../application";
import { POLKADOTJS } from "./polkadotjs";

export const ALEPH_ZERO = {
  account: undefined,
  allAccounts: undefined,
  apisLocal: undefined,
  apisStaging: undefined,
  apisProduction: undefined,
  extensions: undefined,
  activatePolkadotJsExtension: async () => {
    let response = await POLKADOTJS.activatePolkadotjsExtension();
    ALEPH_ZERO.extensions = response.extensions;
    ALEPH_ZERO.allAccounts = response.allAccounts;
    // Set account
    // There's three options here
    if (ALEPH_ZERO.allAccounts.length) {
      POLKADOTJS.listenForAccountSelect(ALEPH_ZERO);
      // 1. User has previously selected account and that info is stored in cookies
      if (
        HELPERS.cookies.get("polkadot_account_name") &&
        HELPERS.cookies.get("polkadot_extension")
      ) {
        ALEPH_ZERO.allAccounts.forEach(function (account) {
          if (
            account.meta.name == HELPERS.cookies.get("polkadot_account_name") &&
            account.meta.source == HELPERS.cookies.get("polkadot_extension")
          ) {
            ALEPH_ZERO.account = account;
            ALEPH_ZERO.updateAfterAccountSet();
          }
        });
      }
      if (!ALEPH_ZERO.account) {
        // 2. User has one account: Auto-select that account
        if (ALEPH_ZERO.allAccounts.length == 1) {
          ALEPH_ZERO.account = ALEPH_ZERO.allAccounts[0];
          ALEPH_ZERO.updateAfterAccountSet();
          // 3. User has multiple accounts: Show modal to select account
        } else {
          $("#polkadot-account-list").modal("show");
          document.enableButton(".polkadot-connect-button");
        }
      }
    }
  },
  getSigner: () => {
    let signer;
    ALEPH_ZERO.extensions.forEach(function (extension) {
      if (extension.name == ALEPH_ZERO.account.meta.source) {
        signer = extension.signer;
      }
    });
    return signer;
  },
  // AKA API
  api: async (environment = "production") => {
    let apis;
    let httpUrls = await ALEPH_ZERO.httpUrls(environment);
    switch (environment) {
      case "staging":
        if (!ALEPH_ZERO.apisStaging) {
          ALEPH_ZERO.apisStaging = [];
          for (const url of httpUrls) {
            let wsProvider = new WsProvider(url);
            let c = await ApiPromise.create({ provider: wsProvider });
            ALEPH_ZERO.apisStaging.push(c);
          }
        }
        apis = ALEPH_ZERO.apisStaging;
        break;
      case "local":
        if (!ALEPH_ZERO.apisLocal) {
          ALEPH_ZERO.apisLocal = [];
          let c = await ApiPromise.create({ provider: "ws://127.0.0.1:9944" });
          ALEPH_ZERO.apisLocal.push(c);
        }
        apis = ALEPH_ZERO.apisLocal;
        break;
      default:
        if (!ALEPH_ZERO.apisProduction) {
          ALEPH_ZERO.apisProduction = [];
          for (const url of httpUrls) {
            let wsProvider = new WsProvider(url);
            let c = await ApiPromise.create({ provider: wsProvider });
            ALEPH_ZERO.apisProduction.push(c);
          }
        }
        apis = ALEPH_ZERO.apisProduction;
        break;
    }
    return _.sample(apis);
  },
  httpUrls: async (environment = "production") => {
    let urls = ["wss://ws.azero.dev"];
    if (environment == "staging") {
      urls = ["wss://ws.test.azero.dev"];
    }
    return urls;
  },
  updateAfterAccountSelect: (event) => {
    let setNewAccount = false;
    let newAddress = event.currentTarget.dataset.accountAddress;
    let newSource = event.currentTarget.dataset.accountSource;
    if (ALEPH_ZERO.account) {
      if (
        ALEPH_ZERO.account.address != newAddress ||
        ALEPH_ZERO.account.meta.source != newSource
      ) {
        setNewAccount = true;
      }
    } else {
      setNewAccount = true;
    }
    if (setNewAccount) {
      ALEPH_ZERO.allAccounts.forEach(function (account) {
        if (account.address == newAddress && account.meta.source == newSource) {
          ALEPH_ZERO.account = account;
          ALEPH_ZERO.updateAfterAccountSet();
        }
      });
    }
  },
  updateAfterAccountSet: () => {
    $("#wallet-toggle").removeClass("d-none");
    $(".wallet-address").text(ALEPH_ZERO.account.address);
    document.cookie = `polkadot_account_name=${ALEPH_ZERO.account.meta.name};`;
    document.cookie = `polkadot_extension=${ALEPH_ZERO.account.meta.source};`;
    $(".polkadot-connect-button").addClass("d-none");
    document.enableButton(".polkadot-connect-button");
    HELPERS.setUserAccountMenuToggle(
      ALEPH_ZERO.account.address,
      ALEPH_ZERO.account.meta.name,
      ALEPH_ZERO.account.meta.source
    );
  },
};
