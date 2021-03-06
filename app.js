const buttonReset = document.querySelector(".column__input-reset");

buttonReset.addEventListener("click", () =>
  resetPage("Здесь могла быть ваша реклама.")
);

function resetPage(code) {
  document.querySelector(".main-block__body").innerHTML = `${code}`;
}

jsonfile.addEventListener("change", uploadFile);

async function uploadFile() {
  let fileJson = await this.files[0].text();
  resetPage("");
  let objJson = JSON.parse(fileJson);
  forObj(objJson);
}

const forObj = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    let directory = document.querySelector(".main-block__body");
    if (typeof value === "string") {
      createDivClassText(key, value, directory);
    } else if (key === "fields") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnFields" + key;
        createDivClass(key, directory);
        createField(key, value);
      });
    } else if (key === "references") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnRef" + key;
        createDivClass(key, directory);
        createReferences(key, value);
      });
    } else if (key === "buttons") {
      createDivClass(key, directory);
      directory = document.querySelector(`.${key}`);
      Object.entries(value).forEach(([key, value]) => {
        key = "columnBtn" + key;
        createDivClass(key, directory);
        createButtons(key, value);
      });
    }
  });
};

const createField = (key, value) => {
  directory = document.querySelector(`.${key}`);
  let idFor = key;
  Object.entries(value).forEach(([key, value]) => {
    if (key === "label") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("for", `${idFor}`);
      elem.className = "fields__label";
      elem.innerHTML = `${value}`;
      directory.append(elem);
    } else if (key === "input") {
      let elem = document.createElement(`${key}`);
      elem.setAttribute("id", `${idFor}`);
      elem.className = "form-control form-control-lg";
      Object.entries(value).forEach(([key, value]) => {
        if (value === "technology") {
          elem = document.createElement("div");
          // elem.setAttribute("id", `${idFor}`);
          // elem.setAttribute("aria-label", ".form-select-lg example");
          elem.className = "btn-group btn-group-sm";
        } else if (key === "technologies") {
          Object.values(value).forEach((value) => {
            // let elemOption = document.createElement("option");
            // elemOption.innerHTML = `${value}`;
            // elem.append(elemOption);
            let elemInput = document.createElement("input");
            elemInput.setAttribute("type", "checkbox");
            elemInput.setAttribute("name", "btnradio");
            elemInput.setAttribute("id", value);
            elemInput.className = "btn-check";
            let elemLabel = document.createElement("label");
            elemLabel.setAttribute("for", value);
            elemLabel.className = "btn btn-lg btn-outline-secondary";
            elemLabel.setAttribute("style", `color: ${value}`);
            elemLabel.innerHTML = value;
            elem.append(elemInput, elemLabel);
          });
        } else if (value === "textarea") {
          elem = document.createElement("textarea");
          elem.className = "form-control";
          elem.setAttribute("id", `${idFor}`);
          elem.setAttribute(`${key}`, `${value}`);
        } else if (key === "colors") {
          elem = document.createElement("div");
          elem.className = "btn-group";
          Object.values(value).forEach((value) => {
            let elemInput = document.createElement("input");
            elemInput.setAttribute("type", "radio");
            elemInput.setAttribute("name", "btnradio");
            elemInput.setAttribute("id", value);
            elemInput.className = "btn-check";
            let elemLabel = document.createElement("label");
            elemLabel.setAttribute("for", value);
            elemLabel.className = "btn btn-lg btn-outline-secondary";
            elemLabel.setAttribute("style", `color: ${value}`);
            elemLabel.innerHTML = value;
            elem.append(elemInput, elemLabel);
          });
        }
        if (value === "checkbox") {
          elem.className = " ";
        }
        if (key === "filetype") {
          value = value.map((valueArr) => {
            return ` .${valueArr}`;
          });
          elem.setAttribute("accept", value);
        } else {
          elem.setAttribute(`${key}`, `${value}`);
          if (key === "mask") {
            $(function () {
              elem.setAttribute("type", "text");
              $(`#${idFor}`).mask(`${value}`);
            });
          }
        }
      });
      // elem.removeAttribute("multiple");
      directory.append(elem);
    }
  });
};

const createReferences = (key, value) => {
  directory = document.querySelector(`.${key}`);
  Object.entries(value).forEach(([key, value]) => {
    if (key === "input") {
      let elem = document.createElement(`${key}`);
      elem.className = "references__input";
      Object.entries(value).forEach(([key, value]) => {
        elem.setAttribute(`${key}`, `${value}`);
      });
      directory.append(elem);
    } else if (key === "text without ref") {
      let elem = document.createElement("span");
      elem.innerHTML = `${value} `;
      directory.append(elem);
    } else if (key === "text") {
      let elem = document.createElement("a");
      elem.setAttribute("href", "#");
      elem.innerHTML = ` ${value}`;
      directory.append(elem);
    } else if (key === "ref") {
      let elem = directory.querySelector("a");
      elem.setAttribute("href", `/json/${value}.js`);

      directory.append(elem);
    }
  });
};

const createButtons = (key, value) => {
  directory = document.querySelector(`.${key}`);
  Object.entries(value).forEach(([key, value]) => {
    let elem = document.createElement("input");
    elem.setAttribute(`type`, `button`);
    elem.setAttribute(`value`, `${value}`);
    elem.className = "column__input-reset";
    directory.append(elem);
  });
};

const createDivClassText = (key, value, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  div.innerHTML = `<h2>${value}</h2>`;
  directory.append(div);
};

const createDivClass = (key, directory) => {
  let div = document.createElement("div");
  div.className = `${key}`;
  directory.append(div);
};
