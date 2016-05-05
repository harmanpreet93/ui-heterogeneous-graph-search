    var onSelect = function() {
        this.button.innerHTML = this.innerHTML;
    }

    var insertPoint = 'insert-here';
    var numberOfDropdowns = 0;

    function makeDropdown(options) {
        // create the button
        var button = document.createElement('BUTTON');
        button.id = numberOfDropdowns; // this is how Material Design associates option/button
        button.setAttribute('class', 'mdl-button mdl-js-button');
        button.innerHTML = 'Default';
        document.getElementById(insertPoint).appendChild(button);

        // add the options to the button (unordered list)
        var ul = document.createElement('UL');
        ul.setAttribute('class', 'mdl-menu mdl-js-menu mdl-js-ripple-effect');
        ul.setAttribute('for', numberOfDropdowns); // associate button
        for (var index in options) {
            // add each item to the list
            var li = document.createElement('LI');
            li.setAttribute('class', 'mdl-menu__item');
            li.innerHTML = options[index];
            li.button = button;
            li.onclick = onSelect;
            ul.appendChild(li);
        }
        document.getElementById(insertPoint).appendChild(ul);
        // and finally add the list to the HTML
        numberOfDropdowns++;
    }

    var optionsA = ["a", "b", "c", "d"];
    makeDropdown(optionsA);
