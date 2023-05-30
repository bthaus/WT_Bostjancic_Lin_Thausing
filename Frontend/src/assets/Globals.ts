export class Globals {

    private static user: string = "";

    constructor() { }
    public static authUser(user: string, password: string) {
        if (user === "a" && password === "a") {
            localStorage.setItem("auth", "true");
            Globals.Username = user;
        }
    }
    public static isAuth(): boolean {
        let str: string | null = localStorage.getItem("auth");
        return (str !== null && str === "true") ? true : false;
    }
    public static logout() {
        localStorage.clear();
    }

    public static get Username(): string {
        return this.user;
    }
    public static set Username(username: string) {
        this.user = username;
    }
}