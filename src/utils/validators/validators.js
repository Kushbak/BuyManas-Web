export const required = (value) => {
    if (value) return undefined

    return 'Обязательное поле'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `Максимальное количество ${maxLength} символов`

    return undefined
}

export const minLengthCreator = (minLength) => (value) => {
    if (value.length < minLength) return `Минимальное количество ${minLength} символов`

    return undefined
}

export const emailValid = (value) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && !!value) {
        return 'Неправильо введен email'
    }
}


export const regMatchInput = (input, allInputs) => input === allInputs.regPassword ? undefined : 'Пароль не совпадает';

export const checkOldPass = (oldPassword) => (value) => {
    if (value !== oldPassword) return `Неправильно введен пароль`

    return undefined
}
export const newPassMatchInput = (input, allInputs) => input === allInputs.newPassword ? undefined : 'Пароль не совпадает';

export const newCannotBeOld = (input, allInputs) => input !== allInputs.oldPassword ? undefined : 'Новый пароль не может совпадать со старым';

