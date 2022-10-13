import React from "react";
import TopSellingWindow from "./TopSellingWindow";

const HomePage = ({token}) => {

    const placeholderProductArr = ['Tea', 'Pot', 'Cup']
    const placeholderReviewArr = [
        {
            rate: '5 stars',
            name: 'John Doe',
            review: 'Those princesses lazily ride the beautiful castle. Those wonderful princesses in both beanstalks in the Dumbo soon ride both ogres. The ogres slowly ate a curse. A Cinderella in horses never went a couple Cinderellas. A bald beanstalk in those wonderful dragons in those delightful ogres beautifully cooked the Aladdin. Clumsy ogres on a Big Bad Wolf quickly ran the proud prince.'
        },
        {
            rate: '4 stars',
            name: 'Jane Foster',
            review: 'Fast forests in the clumsy Ginger Bread Men here bite many clumsy towers. The curse rather kiss both brave Aladdins. Snow Whites daily show a castle. Bewildered knights in a slow curse briskly go the bald Rapunzel. Many horses in the wands slowly dream Big Bad Wolves.'
        }
    ]


    return (
        <>
            <div>
                <h3>History of Tea</h3>
                <p>Once upon a time in a far away place, witty ogres of the prince beautifully kis a few delightful wands. A few Little Red Riding Hoods on a magic Snow White soon cook the Big Bad Wolf. Towers on the proud dwarf soon ate happy curses. An Evil Queen in the fast Fairy God Mother happily sings a few towers. Some beautiful Cinderellas quite kis Dumbos. A big Prince Charming in a Fairy God Mother happily said a big horse. The Aladdin terribly says Aladdins. A couple tiny Fairy God Mothers in fairies rather bit many magic dwarves. A Rapunzel in a wonderful Fairy God Mother never bought the dwarf, and they lived happily ever after.</p>
            </div>
            <div>
                <h3>21st Century Tea</h3>
                <p>Once upon a time in a far away place, the Snow Whites in many witty towers before run both fast Fairy God Mothers. A forest in the witty Ginger Bread Man slowly sleeps the apples. Those witty Evil Queens before buy a princess. A few towers of Cinderellas quickly walk a Ginger Bread Man. A big Aladdin before sleeps princes. The curse in Little Red Riding Hoods in a Fairy God Mother beautifully walks a wonderful Dumbo, and they lived happily ever after.</p>
            </div>
            <div>
                <h2>Top Selling</h2>
                <TopSellingWindow token={token}></TopSellingWindow>
                <h2>Reviews</h2>
                { placeholderReviewArr.map((review, i) => {
                    return (
                        <div key={i}>
                            <h3>{review.rate}</h3>
                            <h3>{review.name}</h3>
                            <p>{review.review}</p>
                            <hr/>
                        </div>
                    )
                } ) }
            </div>
        </>
    )
}

export default HomePage