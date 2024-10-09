export default function getAddressByCoordinates(geocoder: google.maps.Geocoder | null, position: any): Promise<string> {
    return new Promise((resolve, reject) => {
        if (geocoder) {
            geocoder.geocode({ location: { lat: position.lat, lng: position.lng } }, (results: any, status: any) => {
                if (status === 'OK') {
                    if (results![0]) {
                        resolve(results![0].formatted_address);
                    } else {
                        reject('Address not found');
                    }
                } else {
                    reject('Geocoder failed due to: ' + status);
                }
            });
        } else {
            resolve("");
        }
    });
}
