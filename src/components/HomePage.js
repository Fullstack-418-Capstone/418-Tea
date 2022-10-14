import React from "react";
import TopSellingWindow from "./TopSellingWindow";

const HomePage = ({ token }) => {
  const placeholderReviewArr = [
    {
      rate: "5 stars",
      name: "John Doe",
      review:
        "Those princesses lazily ride the beautiful castle. Those wonderful princesses in both beanstalks in the Dumbo soon ride both ogres. The ogres slowly ate a curse. A Cinderella in horses never went a couple Cinderellas. A bald beanstalk in those wonderful dragons in those delightful ogres beautifully cooked the Aladdin. Clumsy ogres on a Big Bad Wolf quickly ran the proud prince.",
    },
    {
      rate: "4 stars",
      name: "Jane Foster",
      review:
        "Fast forests in the clumsy Ginger Bread Men here bite many clumsy towers. The curse rather kiss both brave Aladdins. Snow Whites daily show a castle. Bewildered knights in a slow curse briskly go the bald Rapunzel. Many horses in the wands slowly dream Big Bad Wolves.",
    },
  ];

  return (
    <>
      <div>
        <h3>History of Tea</h3>
        <p>
          The Chinese have consumed tea for thousands of years. The earliest
          physical evidence known to date, found in 2016, comes from the
          mausoleum of Emperor Jing of Han in Xi'an, indicating that tea was
          drunk by Han dynasty emperors as early as the 2nd century BC. The
          samples were identified as tea from the genus Camellia particularly
          via mass spectrometry, and written records suggest that it may have
          been drunk earlier. People of the Han dynasty used tea as medicine
          though the first use of tea as a stimulant is unknown. China is
          considered to have the earliest records of tea consumption, with
          possible records dating back to the 10th century BC. Note however that
          the current word for tea in Chinese only came into use in the 8th
          century AD, there are therefore uncertainties as to whether the older
          words used are the same as tea. The word tu 荼 appears in Shijing and
          other ancient texts to signify a kind of "bitter vegetable" 苦菜, and
          it is possible that it referred to several different plants, such as
          sow thistle, chicory, or smartweed, including tea. In the Chronicles
          of Huayang, it was recorded that the Ba people in Sichuan presented tu
          to the Zhou king. The state of Ba and its neighbour Shu were later
          conquered by the Qin, and according to the 17th century scholar Gu
          Yanwu who wrote in Ri Zhi Lu 日知錄: "It was after the Qin had taken
          Shu that they learned how to drink tea."
        </p>
      </div>
      <div>
        <h3>21st Century Tea</h3>
        <p>
          The first record of tea in English came from a letter written by
          Richard Wickham, who ran an East India Company office in Japan,
          writing to a merchant in Macao requesting "the best sort of chaw" in
          1615. Peter Mundy, a traveller and merchant who came across tea in
          Fuji in 1637, wrote, "chaa—only water with a kind of herb boiled in
          it". In 1657, Thomas Garway, a "tobacconist and coffee-man" was the
          first to sell tea in London at his house in Exchange Alley, charging
          between 16 and 50 shillings per pound. The same year, tea was listed
          as an item in the price list in a London coffee house, and the first
          advertisement for tea appeared in 1658. In 1660 Samuel Pepys recorded
          in his diary: "I did send for a cup of tee a China drink of which I
          never had drank before." It is probable that early imports were
          smuggled via Amsterdam or through sailors arriving on eastern boats.
          The marriage of King Charles II in 1662 to the Portuguese princess
          Catherine of Braganza brought the tea drinking habit to court.
          Official trade of tea began in 1664 with an import of only two pound
          two ounces for presentation to the king, which grew to 24 million
          pounds per year by 1801.
        </p>
        <h3> But What Makes Us Different? We Have the Tea!</h3>
      </div>
      <div>
          <h2>Top Selling</h2>
          <TopSellingWindow token={token}></TopSellingWindow>
        <h2>Reviews</h2>
        {placeholderReviewArr.map((review, i) => {
          return (
            <div key={i}>
              <h3>{review.rate}</h3>
              <h3>{review.name}</h3>
              <p>{review.review}</p>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
