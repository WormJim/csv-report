(function(gobal) {
  let fileElem = document.querySelector('#fileElem');

  let handleFile = (file) => {
    if (file) {
      let reader = new FileReader();

      reader.addEventListener(
        'load',
        (event) => {
          processFile(reader.result, file.name);
        },
        false
      );

      reader.readAsText(file);
    } else {
      console.log('pick File');
    }
  };

  let processFile = (data, name) => {
    axios
      .post('/submit', { json: data })
      .then(({ data }) => {
        saveAs(new File([data], { type: 'text/csv' }), name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let saveAs = (blob, name) => {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');

    name = name.replace(/(\.json)/g, '.csv');

    a.href = url;
    a.download = name;
    a.click();
  };

  fileElem.addEventListener('change', (e) => {
    handleFile(fileElem.files[0]);
  });

  axios
    .get('/readFiles')
    .then(({ data }) => {
      console.log('TCL: data', data);
    })
    .catch((err) => {
      console.log('TCL: err', err);
    });
})(window);
