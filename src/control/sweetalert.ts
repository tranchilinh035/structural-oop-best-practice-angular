import Swal, { SweetAlertType } from 'sweetalert2'
export class SweetalertControl {
    public static confirmSwal(text: string, title: string, type?: SweetAlertType) {
        return new Promise(resolve => {
            Swal.fire({
                title,
                text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((result: any) => {
                if (result.value) {
                    resolve(true);
                    return;
                }
                resolve(false);
            })
        })
    }

    public static alertSwal(text: string, title: string, type?: SweetAlertType) {
        return Swal.fire(title, text, type);
    }

    public static startLoading(text: string, title: string, type?: SweetAlertType) {
        Swal.fire({
            title: title,
            html: text,// add html attribute if you want or remove
            type: type,
            allowOutsideClick: false,
            allowEscapeKey: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
    }

    public static endLoading() {
        Swal.close();
    }
}
