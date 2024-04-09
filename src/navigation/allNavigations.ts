import getStartedNavigations from "./getStartedNavigations";
import homeNavigations from "./homeNavigations";
import pagesNavigations from "./pagesNavigations";
import uiComponentsNavigations from "./uiComponentsNavigations";
import utilitiesNavigations from "./utilitiesNavigations";

const allNavigations = [
  ...homeNavigations,
  ...uiComponentsNavigations,
  ...utilitiesNavigations,
  ...pagesNavigations,
  ...getStartedNavigations,
];

export default allNavigations;
