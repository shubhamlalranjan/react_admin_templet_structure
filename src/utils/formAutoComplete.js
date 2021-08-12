const getOptionLevelForObject = (name) => {
  return (option, items, FormBag) => {
    if (option.name) {
      return option.name;
    } else {
      const value = FormBag.values[name];
      let Label = value;
      items.forEach((item) => {
        if (String(item.value).toLowerCase() === String(value).toLowerCase()) {
          Label = item.name;
          return Label;
        }
      });
      return Label;
    }
  };
};

export { getOptionLevelForObject };
