## Tips and Tricks browser consol

**Locs in consol**: call method `inspect()` on a object
**Console outputs**: `console.__(message)`

- log: normal output
    - string concat with +: all one string output
    - parameter passing: split by '–' in output
- error ❗: Red error message, has filter
- warn ⚠: Yellow warning message, has filter
- info ℹ: (Blue) information, has filter
- debug: Find debugging outputs has filter
- dir: Directory output with more detail output
- table: Objects/ arrays shown in a table

## log level

**Log level**: Use to filter the logged outputs. Show all levels $≥ logLevel$

```javascript
// states of logging
const LEVEL_NONE = -1;
const LEVEL_ERROR = 0;
const LEVEL_WARN = 1;
const LEVEL_INFO = 2;
const LEVEL_LOG = 3;
const LEVEL_DEBUG = 4;

// current level
let logLevel = LEVEL_LOG;
```

long running ausgeführt vor filterung von log level strict evaluation verzögerung durch funktionsübergabe statt wert
übergabe auftuf in funktiontion selbst nach if prüfung log level
