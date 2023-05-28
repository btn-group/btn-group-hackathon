import toastr from "toastr";

document.showAlertInfo = function (text, autoHide = true) {
  toastr.options.closeButton = true;
  toastr.options.closeDuration = 0;
  toastr.options.extendedTimeOut = 0;
  toastr.options.preventDuplicates = true;
  toastr.options.tapToDismiss = false;
  toastr.options.timeOut = 0;
  if (autoHide) {
    toastr.options = {
      progressBar: true,
      preventDuplicates: false,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  toastr.info(text);
};

document.showAlertWarning = function (error, autoHide = true) {
  toastr.options.closeButton = true;
  toastr.options.closeDuration = 0;
  toastr.options.extendedTimeOut = 0;
  toastr.options.preventDuplicates = true;
  toastr.options.tapToDismiss = false;
  toastr.options.timeOut = 0;
  if (autoHide) {
    toastr.options = {
      progressBar: true,
      preventDuplicates: false,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  toastr.warning(error);
};

document.showAlertDanger = function (error, autoHide = false) {
  document.eeeeee = error;
  if (error.errorMessage) {
    error = error.errorMessage;
  }
  if (error != "usercancelled") {
    toastr.options.closeButton = true;
    toastr.options.closeDuration = 0;
    toastr.options.extendedTimeOut = 0;
    toastr.options.preventDuplicates = true;
    toastr.options.tapToDismiss = false;
    toastr.options.timeOut = 0;
    if (autoHide) {
      toastr.options = {
        progressBar: true,
        preventDuplicates: false,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
    }
    toastr.error(error);
  }
};

document.showAlertSuccess = function (text, autoHide = false) {
  toastr.options.closeButton = true;
  toastr.options.closeDuration = 0;
  toastr.options.extendedTimeOut = 0;
  toastr.options.preventDuplicates = true;
  toastr.options.tapToDismiss = false;
  toastr.options.timeOut = 0;
  if (autoHide) {
    toastr.options = {
      progressBar: true,
      preventDuplicates: false,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  toastr.success(text);
};
