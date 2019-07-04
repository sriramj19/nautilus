import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    constructor() {

    }

    public setToLocalStorage(key: string, value: any) {
        this.removeFromLocalStorage(key);
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }

    public getFromLocalStorage(key: string) {
        return localStorage.getItem(key);
    }

    public removeFromLocalStorage(key: string) {
        if (this.getFromLocalStorage(key)) {
            localStorage.removeItem(key);
        }
    }

    public copyByValue(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    public raiseException(message: string, data: any) {
        console.log('!Exception while ' + message);
        console.log('#Detailed Report: ', data);
    }

    /**
     * @description scrolling to top of window
     */
    public scrollToTopOfWindow() {
        try {
            scroll(0, 0);
        } catch (error) {
            this.raiseException('scrolling to top', error);
        }
    }
}