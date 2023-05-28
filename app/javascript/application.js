// Entry point for the build script in your package.json

// IMPORTS
import "./src/jquery";
import * as bootstrap from "bootstrap";
import "./src/lodash";
import "./src/polkadotjs";
import "./src/toastr";
import "./src/datatables";

// LISTINGS
import "./src/listings/index";

export const HELPERS = {
  cookies: {
    get: (id) => {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${id}=`))
        ?.split("=")[1];
    },
  },
  setUserAccountMenuToggle: (address, name, source) => {
    $("#wallet-toggle img.user-address-alias-avatar").attr(
      "src",
      `https://res.cloudinary.com/hv5cxagki/image/upload/c_scale,dpr_2,f_auto,h_25,q_100/${HELPERS.walletCloudinaryPublicId(
        source
      )}`
    );
    $("#wallet-toggle .account-name").text(name);
    $("#wallet-toggle .account-address-abbreviated").text(
      `${address.substring(0, 3)}...${address.slice(-3)}`
    );
  },
  walletCloudinaryPublicId: function (id) {
    switch (id) {
      case "polkadot-js":
        return "logos/download_qbpd9p";
      case "subwallet-js":
        return "logos/subwallet.3be275bc71284f30e5bc_cwag5o";
      case "talisman":
        return "logos/Talisman-Icon-Red_e75eas.png";
      default:
        return "external-content.duckduckgo-1_memqe7";
    }
  },
};

document.disableButton = function (selector) {
  let $button = $(selector);
  $button.prop("disabled", true);
  $button.find(".loading").removeClass("d-none");
  $button.find(".ready").addClass("d-none");
};

document.enableButton = function (selector) {
  let $button = $(selector);
  $button.prop("disabled", false);
  $button.find(".loading").addClass("d-none");
  $button.find(".ready").removeClass("d-none");
};
