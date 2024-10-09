import img1 from '../images/city1.jpg'
import img2 from '../images/desert1.webp'
import img3 from '../images/coffee.jpg'
import Carousel from '../components/Carousel'
import city from '../images/city2.jpg'
import forest from '../images/forest1.jpg'
import family from '../images/family2.jpg'
import desert from '../images/desert1.webp'
import market from '../images/market1.jpg'
import sea from '../images/sea1.jpg'
import { Grid } from '@mui/material'
import CardRound from '../components/CardRound'
import { PATHS } from '../routes/paths'
const images=[
    {
        label:"city",
        img:img1
    },{
        label:"dessert",
        img:img2
    },{
        label:"coffee",
        img:img3
    }
]
export default function HomePage(){
    

    
    return <>
    <Carousel images={images} />
    <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <CardRound image={sea} title={"ים"} text={" אין על רעש הגלים המלחכים את החוף באשמורת הבוקר"} url={`${PATHS.findTrack}/sea`}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <CardRound image={forest} title={"יער"} text={"אתם מוזמנים לחוות את היערות האינסופיים של ארצינו"} url={`${PATHS.findTrack}/forest`}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <CardRound image={city} title={"אורבני"} text={"חריקת מכוניות על אספלט , טפיפות זבי חוטם, זהו נוף אורבני אקזוטי שאין כמותו"} url={`${PATHS.findTrack}/city`}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <CardRound image={market} title={"שוק"} text={"בואו לחוות את מגוון הריחות והטעמים של השווקים המסורתיים"} url={`${PATHS.findTrack}/market`}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <CardRound image={family} title={"משפחה"} text={"זה הזמן ליצור רגעים בלתי נשכחים. טיולים לכל המשפחה"} url={`${PATHS.findTrack}/with family`}/>
        </Grid>
        <Grid item xs={12} md={4}>
            <CardRound image={desert} title={"מדבר"} text={"בואו להתחבר לנופים הבראשיתיים של המדברות האינסופיים"} url={`${PATHS.findTrack}/desert`}/>
        </Grid>
    </Grid>
    </>
}