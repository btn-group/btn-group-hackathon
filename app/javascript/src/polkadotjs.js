// === POLKADOT ===
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
window.ContractPromise = ContractPromise;
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { BN } from "@polkadot/util";
window.ApiPromise = ApiPromise;
window.BN = BN;
window.WsProvider = WsProvider;
window.web3Accounts = web3Accounts;
window.web3Enable = web3Enable;
window.web3FromAddress = web3FromAddress;

// === USE INKATHON ===
import {
  contractCallDryRun,
  contractQuery,
  contractTx,
  // useInkathon,
  // useContract,
} from "@scio-labs/use-inkathon";

// === CUSTOM ===
import { HELPERS } from "../application";

export const POLKADOTJS = {
  // https://polkadot.js.org/docs/extension/usage/
  activatePolkadotjsExtension: async () => {
    if ($(".polkadotjs").length) {
      let polkadotConnectButtonSelector = ".polkadot-connect-button";
      $(polkadotConnectButtonSelector).removeClass("d-none");
      document
        .querySelectorAll(polkadotConnectButtonSelector)
        .forEach((item) => {
          item.addEventListener("click", async (evt) => {
            await POLKADOTJS.connectPolkadotjsExtension();
          });
        });
      return await POLKADOTJS.connectPolkadotjsExtension();
    }
  },
  connectPolkadotjsExtension: async () => {
    document.disableButton(".polkadot-connect-button");
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    // this call fires up the authorization popup
    try {
      const extensions = await web3Enable("Escrow Demo | btn.group");
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      if (extensions.length === 0) {
        throw "Please install Subwallet, Polkadotjs or Talisman browser extension. If you have one of these extensions installed already, please goto the setttings and allow this site access.";
      }
      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      const allAccounts = await web3Accounts();
      POLKADOTJS.initAccountList(allAccounts);
      return {
        extensions,
        allAccounts,
      };
    } catch (err) {
      document.showAlertDanger(err);
      document.enableButton(".polkadot-connect-button");
    }
  },
  contractQuery,
  contractTx: async (
    api,
    account,
    contract,
    method,
    options = {},
    args = [],
    statusCb = undefined
  ) => {
    try {
      return await contractTx(
        api,
        account,
        contract,
        method,
        options,
        args,
        statusCb
      );
    } catch (err) {
      if (typeof err.errorMessage == "string") {
        throw err;
      }

      let decodeOutput = err.errorMessage;
      let result = await contractCallDryRun(
        api,
        account,
        contract,
        method,
        options,
        args
      );
      const { isError, decodedOutput } = decodeOutput(result, contract, method);
      if (isError) {
        return Promise.reject({
          result,
          errorMessage: decodedOutput || "Error",
        });
      }
    }
  },
  initAccountList: (accounts) => {
    $("#polkadot-account-list .list").html("");
    _.sortBy(accounts, ["meta.source", "meta.name"]).forEach(function (
      account
    ) {
      $("#polkadot-account-list .list").append(
        `<li class='bg-hover-light p-0' data-account-address= '${
          account.address
        }', data-account-name= '${account.meta.name}', data-account-source= '${
          account.meta.source
        }'><a href='#' class='d-flex align-items-center'><div class='h-40px w-40px text-center me-3'><img class="h-100" src='https://res.cloudinary.com/hv5cxagki/image/upload/c_pad,dpr_2,f_auto,h_25,w_25,q_100/v1/${HELPERS.walletCloudinaryPublicId(
          account.meta.source
        )}'></div><div class="d-block"><div class="fw-bold text-gray-900">${
          account.meta.name
        }</div><div class="fs-4 text-muted fw-semibold"><div class="lh-base">${
          account.address
        }</div></div></div>`
      );
    });
  },
  listenForAccountSelect: function (scope) {
    $("#polkadot-account-list li").click(function (e) {
      e.preventDefault();
      $("#polkadot-account-list").modal("hide");
      scope.updateAfterAccountSelect(e);
    });
  },
};

$(document).ready(function () {
  POLKADOTJS.activatePolkadotjsExtension();
});
