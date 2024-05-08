export const handleTag = (data) => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    let handledData = {
      TYPE: "COMMENT",
      SCOPE: "",
      NAME: "",
      DESCRIPTION: data[i].PLC_DESCRIPTION,
      DATATYPE: "",
      SPECIFIER: data[i].PLC_IO,
      ATTRIBUTES: ""
    }

    if (data[i].TYPE === "DI" || data[i].TYPE === "AI") {
      const index = data[i].PLC_IO.indexOf("I");
      handledData.NAME = data[i].PLC_IO.substring(0, index + 1);
    } else {
      const index = data[i].PLC_IO.indexOf("O.");
      handledData.NAME = data[i].PLC_IO.substring(0, index + 1);
    }
    result.push(handledData);
  }
  return result;
};

export const handleWPSTag = (data) => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    const indexOfSpace = data[i].PLC_DESCRIPTION.indexOf(" ");
    let handledData = {
      TYPE: "TAG",
      SCOPE: "",
      NAME: "",
      DESCRIPTION: data[i].PLC_DESCRIPTION.substring(indexOfSpace + 1),
      DATATYPE: "",
      SPECIFIER: "",
      ATTRIBUTES: "(Constant := false, ExternalAccess := Read/Write)"
    }

    if (data[i].TYPE !== "AO") {
      const index = data[i].TAG_NAME.indexOf("-");
      const alphabets = data[i].TAG_NAME.substring(0, index);
      const numbers = data[i].TAG_NAME.substring(index + 1);
      handledData.NAME = alphabets + "_" + numbers;
      data[i].TYPE === "DI" ? handledData.DATATYPE = "WPSDI" :
      data[i].TYPE === "AI" ? handledData.DATATYPE = "WPSAI" :
      handledData.DATATYPE = "WPSDO";
    result.push(handledData);
    }
  }
  return result;
};