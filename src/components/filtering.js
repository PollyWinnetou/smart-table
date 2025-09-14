import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes)                                    // Получаем ключи из объекта
    .forEach((elementName) => {                        // Перебираем по именам
      elements[elementName].append(                    // в каждый элемент добавляем опции
          ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                    .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');
                        option.value = name;  // значение опции
                        option.textContent = name;  // отображаемый текст
                        return option;                                                     // @todo: создать и вернуть тег опции
                    })
      )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        const clearButton = document.querySelectorAll('button[name="clear"]');
        clearButton.forEach(button => {
            button.addEventListener('click', function() {
                const fieldName = action.dataset.field;
                const parent = action.closest('.filter-wrapper');
                const input = parent.querySelector(`input[name="${fieldName}"]`);
                input.value = '';
                state.filters[input.dataset.name] = '';
    })})

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}