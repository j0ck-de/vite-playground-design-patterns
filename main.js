import "./src/css/style.css";
import { getRandomNumber } from "./src/js/utils/getRandomNumber.js";
import { heatFlowCalculator } from "./src/js/apps/heatFlowCalculator";
import builder from "./src/js/design-patterns/creational/builder.js";
import factory from "./src/js/design-patterns/creational/factory";
import prototype from "./src/js/design-patterns/creational/prototype";
import logger from "./src/js/design-patterns/creational/singleton";
import abstractFactory from "./src/js/design-patterns/creational/abstract-factory";

import adapter from "./src/js/design-patterns/structural/adapter";
import composite from "./src/js/design-patterns/structural/composite";
import observer from "./src/js/design-patterns/behavioral/observer";
import templateMethod from "./src/js/design-patterns/behavioral/template-method";
import state from "./src/js/design-patterns/behavioral/state";
import mediator from "./src/js/design-patterns/behavioral/mediator";

import ChangeBodyBgOnScroll from "./src/js/components/ChangeBodyBgOnScroll";
import { QuizController } from "./src/js/apps/quiz";

console.log(getRandomNumber());

builder();
factory();
prototype("#card-container");
logger();
abstractFactory();

adapter();
composite();

observer();
templateMethod();
state();
mediator();

ChangeBodyBgOnScroll.init(2);
heatFlowCalculator.init("#heatFlowCalculator");
QuizController;
