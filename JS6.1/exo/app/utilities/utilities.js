function dateDiffInDays(date) {
    const today = new Date();
    const diff = today - new Date(date);
    return Math.floor(diff / 1000 / 60 / 60 / 24);
}

function deleteCardIf(card) {
    if (card) {
        card.remove();
    }
}

export { dateDiffInDays, deleteCardIf };
