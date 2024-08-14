import { db } from "../src/database";
import bcrypt from "bcrypt";

interface Province {
    province: string;
    districts: string[];

}
const province: Province[] = [
    {
        province: "Maputo Provincia",
        districts: [
            'Boane District',
            'Magude District',
            'Manhiça District',
            'Marracuene District',
            'Matutuíne District',
            'Moamba District',
            'Namaacha District',
        ]},
        {
            province:'Maputo Cidade',
            districts: ['Maputo'            ]
        },
        {
        province: 'Gaza',
        districts: [
            'Bilene Macia District',
            'Chibuto District',
            'Chicualacuala District',
            'Chigubo District',
            'Chókwè District',
            'Guijá District',
            'Mabalane District',
            'Manjacaze District',
            'Massangena District',
            'Massingir District',
            'Xai - Xai District'
        ]},
        {
            province: 'Inhambane',
            districts: [
                'Funhalouro District',
                'Govuro District',
                'Homoine District',
                'Inharrime District',
                'Inhassoro District',
                'Jangamo District',
                'Mabote District',
                'Massinga District',
                'Maxixe District',
                'Morrumbene District',
                'Panda District',
                'Vilanculos District',
                'Zavala District'
            ]},
            {
                province: 'Manica',
                districts: [
                    'Báruè District',
                    'Gondola District',
                    'Guro District',
                    'Machaze District',
                    'Macossa District',
                    'Manica District',
                    'Mossurize District',
                    'Sussundenga District',
                    'Tambara District',
                ]},
            {
                province: 'Sofala',
                districts: [
                    'Buzi District',
                    'Caia District',
                    'Chemba District',
                    'Cheringoma District',
                    'Chibabava District',
                    'Dondo District',
                    'Gorongosa District',
                    'Marromeu District',
                    'Machanga District',
                    'Maringué District',
                    'Muanza District',
                    'Nhamatanda District',

                ]},
            {
                province: 'Zambézia',
                districts: [
                    'Alto Molocue District',
                    'Chinde District',
                    'Gilé District',
                    'Gurué District',
                    'Ile District',
                    'Inhassunge District',
                    'Lugela District',
                    'Maganja da Costa District',
                    'Milange District',
                    'Mocuba District',
                    'Mopeia District',
                    'Morrumbala District',
                    'Namacurra District',
                    'Namarroi District',
                    'Nicoadala District',
                    'Pebane District'
                ]},
                {
                    province: 'Tete',
                    districts: [
                    'Angónia District',
                    'Cahora-Bassa District',
                    'Changara District',
                    'Chifunde District',
                    'Chiuta District',
                    'Doa District',
                    'Macanga District',
                    'Magoé District',
                    'Marávia District',
                    'Moatize District',
                    'Mutarara District',
                    'Tsangano District',
                    'Zumbo District'
                    ]},
                {
                    province: 'Nampula',
                    districts:[
                    'Angoche District',
                    'Eráti District',
                    'Lalaua District',
                    'Malema District',
                    'Meconta District',
                    'Mecubúri District',
                    'Memba District',
                    'Mogincual District',
                    'Mogovolas District',
                    'Moma District',
                    'Monapo District',
                    'Mossuril District',
                    'Muecate District',
                    'Murrupula District',
                    'Nacala-a-Velha District',
                    'Nacarôa District',
                    'Nampula District',
                    'Ribáuè District'
                    ]
                },
                {
                    province: 'Niassa',
                    districts:[
                    'Cuamba District',
                    'Lago District',
                    'Lichinga District',
                    'Majune District',
                    'Mandimba District',
                    'Marrupa District',
                    'Maúa District',
                    'Mavago District',
                    'Mecanhelas District',
                    'Mecula District',
                    'Metarica District',
                    'Muembe District',
                    'Ngauma District',
                    'Nipepe District',
                    'Sanga District'
                    ]
                },
                {
                    province: 'Cabo-Delgado',
                    districts:[
                    'Ancuabe District',
                    'Balama District',
                    'Chiúre District',
                    'Ibo District',
                    'Macomia District',
                    'Mecúfi District',
                    'Meluco District',
                    'Metuge District',
                    'Mocímboa da Praia District',
                    'Montepuez District',
                    'Mueda District',
                    'Muidumbe District',
                    'Namuno District',
                    'Nangade District',
                    'Palma District',
                    'Quissanga District'
                    ]
                }

]
async function seed() {

    const passwordHash = await bcrypt.hash('123456789', 10);
    return Promise.all([
         ... province.map(async (province) => {
            await db.province.create({
                data:{
                    designation: province.province,
                    districts: {
                        create:
                        province.districts.map( (district) => ({
                            designation: district
                        }))
                    }
                }
            })
            // 
        }), 
    await db.admin.create({
        data: {
            name: 'Administrator',
            email: 'admin@beprepared.co.mz',
            password: passwordHash
        }
    })]); 
}
    


seed().then(() => {
    console.log('Seeds created!');
});