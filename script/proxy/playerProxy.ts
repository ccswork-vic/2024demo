export class PlayerProxy {
    private m_userId: string;
    private m_password: string;

    public get userId(): string {
        return this.m_userId;
    }

    public set userId(value: string) {
        this.m_userId = value;
    }

    public get password(): string {
        return this.m_password;
    }

    public set password(value: string) {
        this.m_password = value;
    }

}