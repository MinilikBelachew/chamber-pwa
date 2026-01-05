export function formatName(name: string) {
    if (!name) return '';
    return name.split(' ').map(word =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
    ).join(' ');
}
