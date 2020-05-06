const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
       ${name} <span class="filter__${name}-count">${count}</span></label>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((item) => createFilterMarkup(item, item.checked)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

export {createFilterTemplate};
