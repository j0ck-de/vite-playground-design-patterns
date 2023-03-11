"use strict";
const template = `
  <div class="app">
    <form class="app__form">
      <fieldset class="app__fieldset">
        <legend class="app__legend">
          <h1 class="app__heading">Heizkörperleistung Umrechner</h1>
        </legend>

        <!-- DESCRIPTION -->
        <div class="app__description description">
          <p class="description__text">
            Will man für eine gegebene Raum-Heizlast einen Heizkörper
            auswählen, so bemüht man die Wärmeleistungs-Tabellen der
            Heizkörper-Hersteller. Diese enthalten die Norm-Wärmeleistung
            der Heizkörper nach DIN EN 442, auf Grundlage der
            Systemtemperaturen von:
          </p>

          <table class="description__box">
            <tr>
              <td>Vorlauftemperatur:</td>
              <td>75°C</td>
            </tr>
            <tr>
              <td>Rücklauftemperatur:</td>
              <td>65°C</td>
            </tr>
            <tr>
              <td>Raumlufttemperatur:</td>
              <td>20°C</td>
            </tr>
          </table>

          <p class="description__text">
            Vorteilhafterweise haben die meisten Hersteller ihre
            Leistungstabellen auf die gebräuchlichsten Systemtemperaturen,
            wie z.B. 70/55 °C bzw. 55/45 °C, bei verschiedenen
            Raumlufttemperaturen umgerechnet. Sind aber für die geplante
            Heizungsanlage andere Systemtemperaturen vorgesehen, müssen
            diese erst umgerechnet werden.
          </p>
        </div>

        <!-- INPUT FIELDS -->
        <div class="app__inputs inputs">
          <div class="inputs__container inputs__container--top">
            <input
              type="number"
              class="inputs__input"
              placeholder="Feed"
              name="heatFeed"
            />
            <input
              type="number"
              class="inputs__input"
              placeholder="Return"
              name="heatReturn"
            />
            <input
              type="number"
              class="inputs__input"
              placeholder="Temperature"
              name="heatTemperature"
            />
          </div>

          <div class="inputs__container inputs__container--bottom">
            <input
              type="number"
              class="inputs__input"
              placeholder="Value"
              name="value"
            />
            <input
              type="number"
              class="inputs__input"
              placeholder="Exponent"
              name="exponent"
            />
          </div>
        </div>

        <!-- RESULT CONTAINER -->
        <div class="app__results results">
          <div class="results__result">Result</div>
        </div>
      </fieldset>
    </form>
  </div>
`;

// Data Controller
const dataController = (() => {
  // Blueprint for system temperatures
  class SystemTemperatures {
    constructor(heatFeed, heatReturn, heatTemperature) {
      this.heatFeed = heatFeed;
      this.heatReturn = heatReturn;
      this.heatTemperature = heatTemperature;
    }
  }

  // Blueprint for calculation data.
  class CalculationData extends SystemTemperatures {
    constructor(heatFeed, heatReturn, heatTemperature, value, exponent) {
      super(heatFeed, heatReturn, heatTemperature);
      this.value = value;
      this.exponent = exponent;
    }
  }

  // Data object
  const data = {
    // Fill the data.NORM_VALUES object with data, coming from SystemTemperatures constructor.
    NORM_VALUES: new SystemTemperatures(75, 65, 20), // heatFeed, heatReturn, heatTemperature,

    //  Fill the data.DEFAULT_VALUES object with data, coming from CalculationData constructor.
    DEFAULT_VALUES: new CalculationData(70, 60, 20, 2800, 1.337), // heatFeed, heatReturn, heatTemperature, value, exponent

    // Create an empty data.user object. It will be modified after initializtion.
    user: {}, // result: undefined, heatFeed: 70, heatReturn: 60 , heatTemperature: 20, value: 2800, exponent: 1.337

    // Initialize the data object.
    init() {
      this._setUserData();
      // this.updateUserResult();
    },

    /**
     *  In case the user wants to calculate the result without changing the data.default,
     *  we need a pre-filled user data object. We just copy the data.default object.
     *  We also add the property 'result' which is not available in the data.default object.
     */
    _setUserData() {
      return (this.user = Object.assign(
        { result: undefined },
        this.DEFAULT_VALUES
      ));
    },

    // When the user changes the input field the user data gets updated.
    updateUserData() {
      return (this.user[event.target.name] = +event.target.value);
    },

    // When this method gets fired, the calculation process gets started and the final result gets stored in data.user.result.
    updateUserResult() {
      return (this.user.result = _calculate.getResult());
    },
  };

  /**
   *  The _calculate object contains the NORM_VALUES object which contains the norm temperature values after DIN EN442.
   *  GetResult method calculates the result with the data.user values.
   */
  const _calculate = {
    // Formula to calculate the temperature difference. Argument is a destructered object.
    _getTemperatureDifference({ heatFeed, heatReturn, heatTemperature }) {
      return (
        (heatFeed - heatReturn) /
        Math.log((heatFeed - heatTemperature) / (heatReturn - heatTemperature))
      );
    },

    // Get the norm temperature difference.
    get normTemperautreDifference() {
      return this._getTemperatureDifference(data.NORM_VALUES);
    },

    // get the user temperature difference.
    get userTemperatureDifference() {
      return this._getTemperatureDifference(data.user);
    },

    // Calculate the result and return it.
    getResult() {
      return Math.round(
        data.user.value *
          Math.exp(
            Math.log(
              this.userTemperatureDifference / this.normTemperautreDifference
            ) * data.user.exponent
          )
      );
    },
  };

  return {
    data, // TODO: DELETE LATER

    // Initialize the DataController
    init() {
      // Initialize the data object.
      data.init();
    },

    // Public method for the calculation process
    calculate() {
      // Update the user data by getting the input value
      data.updateUserData();

      // Update the user result with the calculated value
      data.updateUserResult();
    },
  };
})();

// View Controller
const viewController = (() => {
  // Collect the DOM strings for easier access.
  const DOMStrings = {
    inputElements: ".inputs__input",
    buttonCalculate: ".button__calculate",
    resultDIV: ".results__result",
  };

  // Create an inputElements object to manage input element related stuff.
  const inputElements = {
    // Initialize the inputElements object.
    init(obj) {
      // Get the data.DEFAULT_VALUES object and set the input element values
      this._setDefaultValues(obj);
    },

    // Methods to fill the input elements with the data.DEFAULT_VALUES data.
    _setDefaultValues(obj) {
      // Get all input nodes as a nodeList
      const inputsNodeList = document.querySelectorAll(
        DOMStrings.inputElements
      );

      // Loop through the nodeList
      inputsNodeList.forEach((input) => {
        // For each nodeList iteratation loop thourgh the object and look for the matching inputs
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            // If the object property machtes the input name, set the value attribute.
            if (key === input.name) input.setAttribute("value", element);
          }
        }
      });
    },
  };

  return {
    inputElements, // TODO: DELETE LATER

    // Initialize the ViewController.
    init(obj) {
      // Initialize the inputElements object.
      inputElements.init(obj);
    },

    // Make the DOMStrings public.
    getDOMStrings() {
      return DOMStrings;
    },

    // Display the result in the DOM
    displayResult(objResult) {
      // Get the result div
      const resultDIV = document.querySelector(DOMStrings.resultDIV);

      // Fill the result div with data.user.result
      resultDIV.innerHTML = `Result: ${objResult}`;
    },
  };
})();

// App Controller
const appController = ((dataCtrl, viewCtrl) => {
  // Gett the DOMStrings from viewCtrl and save it in DOM for easier access.
  const DOM = viewCtrl.getDOMStrings();

  // Load template
  const loadTemplate = (id) => {
    const app = document.querySelector(id);
    app.innerHTML = template;

    // INPUT EVENTS
    const inputElements = (() => {
      const inputHandler = () => {
        dataCtrl.calculate();
        viewCtrl.displayResult(dataCtrl.data.user.result);
      };

      // add an eventListener for each node in the nodeList
      document
        .querySelectorAll(DOM.inputElements)
        .forEach((node) => node.addEventListener("input", inputHandler));
    })();
  };

  // BUTTON EVENTS
  // const buttonElements = (() => {

  //   const buttonResultHandler = () => {
  //     dataCtrl.calculate();
  //     viewCtrl.displayResult(dataCtrl.data.user.result);
  //   };

  //   // add an eventListener to the calculate button
  //   document.querySelector(DOM.buttonCalculate)
  //     .addEventListener('click', buttonResultHandler);

  // })();

  return {
    init(id) {
      loadTemplate(id);
      dataCtrl.init();
      viewCtrl.init(dataCtrl.data.DEFAULT_VALUES);
    },
  };
})(dataController, viewController);

export { appController as heatFlowCalculator };
