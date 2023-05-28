import { ALEPH_ZERO } from "../aleph_zero";
import { POLKADOTJS } from "../polkadotjs";

$(document).ready(function () {
  if ($("#listings-index").length) {
    ALEPH_ZERO.escrow.listings.index = {
      init: async () => {
        await ALEPH_ZERO.activatePolkadotJsExtension();
      },
      // For now just show the latest 250
      getAndSet: async(page, size) => {
        let api = await ALEPH_ZERO.api("staging");
        let walletAddress = "5Ct6QWhVw19sycue4km33E2eHxmgSdAW4jUGzGfdBDKxvL5L";
        const contract = await ALEPH_ZERO.lightSwitch.getContract();
        const { gasRequired, storageDeposit, result, output } =
          await POLKADOTJS.contractQuery(
            api,
            walletAddress,
            contract,
            "config"
          );
        let result = result.toHuman().Ok;
        console.log(result);
        let listings = result.values;
        let length = result.length;
      },
    };

    ALEPH_ZERO.escrow.index.init();
  }
});
