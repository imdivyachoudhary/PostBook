var showNotification = (type,message) => {
    new Noty({
        theme: "relax",
        text: message,
        type: type,
        layout: "topCenter",
        timeout: 3000,
      }).show();
}
