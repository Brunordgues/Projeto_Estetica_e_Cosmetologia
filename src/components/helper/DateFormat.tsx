const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

const weekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
]

export const dateFormat = (data: Date) => {
    const year = data.getFullYear().toString();
    const month = (data.getMonth() + 1).toString();
    const day = data.getDate().toString();

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
}

export const dateTimeFormat = (data: Date) => {
    const hour = data.getHours().toString().padStart(2, "0");
    const minute = data.getMinutes().toString().padStart(2, "0");

    return `${dateFormat(data)} ${hour}:${minute}`;
}

export const extendDateFormat = (data: Date) => {
    const month = months[data.getMonth()];
    const weekDay = weekDays[data.getDay()];
    const day = data.getDate();

    return `${weekDay}, ${day} de ${month}`;
}