import { ALEPH_ZERO } from "../aleph_zero";

$(document).ready(function () {
  if ($("#listings-index").length) {
    LISTINGS_INDEX = {
      init: async () => {
        await ALEPH_ZERO.activatePolkadotJsExtension();
      },
    };

    LISTINGS_INDEX.init();
  }
});
