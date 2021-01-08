import { userInfo } from "os";

export class ConfigOptions {
    private using_symbol_filter:boolean;
    constructor(using_symbol_filter: boolean) {
        this.using_symbol_filter = using_symbol_filter;
    }

    IsUsingSymbolFilter():boolean{
        return this.using_symbol_filter.valueOf();
    }
}