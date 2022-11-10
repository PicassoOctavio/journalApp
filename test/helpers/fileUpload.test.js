import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'duxdc3zmg',
    api_key: '267632776588246',
    api_secret: 'ByQO0o_gx_85HiFwXN_u8MpFe-0',
    secure: true
})

describe('pruebas en fileUpload', () => { 
   
    test('should upload de file correctly', async () => { 
        
        const imageUrl = 'https://pix10.agoda.net/hotelImages/149/149052/149052_15012019550024720287.jpg?ca=3&ce=1&s=1024x768';

        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });

    });

    test('should return null', async  () => { 
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
     })


});