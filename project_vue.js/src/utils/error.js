const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Такого email немає.',
    INVALID_PASSWORD: 'Невірний пароль.',
    auth: 'Будь ласка, введіть дані.',
    INVALID_EMAIL: 'Невірний email.',
    EMAIL_EXISTS: 'Адреса електронної пошти вже використовується іншим обліковим записом.',
    OPERATION_NOT_ALLOWED: 'Для цього проекту вхід за допомогою пароля вимкнено.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Ми заблокували всі запити з цього пристрою через незвичну активність. Спробуйте ще раз пізніше.'
}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code]
        : code.includes('TOO_MANY_ATTEMPTS_TRY_LATER')
            ? ERROR_CODES['TOO_MANY_ATTEMPTS_TRY_LATER']
            : 'Неизвестная ошибка.'
}