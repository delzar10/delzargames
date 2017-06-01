'use strict';


export default class Util {
    constructor (){}

    /**
     * Rename the default uploaded file name to a related one
     *
     * @param defaultName
     * @param relatedName
     */
    renameImage (defaultName, relatedName) {
      defaultName = relatedName + '.' + defaultName.split(".")[1];
      return defaultName.split(" ").join("-");
    }
}
