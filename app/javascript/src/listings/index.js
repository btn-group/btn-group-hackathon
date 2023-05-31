import { ALEPH_ZERO } from "../aleph_zero";
import { POLKADOTJS } from "../polkadotjs";

$(document).ready(function () {
  if ($("#listings-index").length) {
    ALEPH_ZERO.escrow.listings.index = {
      datatable: $("#listings-table").DataTable({
        columns: [
          {
            data: "vendor",
            title: "Vendor",
          },
          {
            data: "available_amount",
            title: "Available (TZERO)",
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).text(
                document.humanizeStringNumberFromSmartContract(
                  document.formatHumanizedNumberForSmartContract(
                    sData,
                    0
                  ),
                  12
                )
              );
            },
          },
          {
            data: "price_per_token",
            title: "Price (USDT on Ethereum)",
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
              $(nTd).text(
                document.humanizeStringNumberFromSmartContract(
                  document.formatHumanizedNumberForSmartContract(
                    sData,
                    0
                  ),
                  6
                )
              );
            },
          }
        ],
        dom: '<"top"i>frtp',
        order: [[0, "desc"]],
        ordering: true,
        paging: false,
        rowId: function (a) {
          return a.id;
        },
      init: async () => {
        await ALEPH_ZERO.activatePolkadotJsExtension();
      },
      // For now just show the latest 250
      getAndSetListings: async(page, size) => {
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
        listings = response.filter((c) => c.status == 0);
        listings = response.filter((c) => c.available_amount != "0");
        ALEPH_ZERO.escrow.listings.index.datatable.clear();
        ALEPH_ZERO.escrow.listings.index.datatable.rows.add(listings);
        ALEPH_ZERO.escrow.listings.index.datatable.columns.adjust().draw();
      },
    };

    ALEPH_ZERO.escrow.index.init();
  }
});
