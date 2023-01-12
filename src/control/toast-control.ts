export class ToastControl {
    public static showSuccessToast(text: string, title?: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = false;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 5000;
        toastr.options.timeOut = 5000;
        toastr.success(text, title);
    }

    public static showErrorToast(text: string, title?: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = false;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 5000;
        toastr.options.timeOut = 5000;
        toastr.error(text, title);
    }

    public static showWarningToast(text: string, title?: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = false;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 5000;
        toastr.options.timeOut = 5000;
        toastr.warning(text, title);
    }

    public static showErrorToastForAccountState(text: string) {
        const toastr = (<any>window).toastr;
        toastr.options.preventDuplicates = false;
        toastr.options.closeButton = true;
        toastr.options.extendedTimeOut = 0;
        toastr.options.timeOut = 0;
        toastr.error(text);
        return toastr;
    }
}
