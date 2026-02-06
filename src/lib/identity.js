export function getUserId() {
    const STORAGE_KEY = 'acadrive_user_id';
    let userId = localStorage.getItem(STORAGE_KEY);

    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, userId);
    }

    return userId;
}
