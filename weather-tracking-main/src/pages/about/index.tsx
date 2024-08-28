import { TeamMember } from "@/components/TeamMember";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const About = () => {
  return (
    <div>
      <h1 className="mb-3 text-2xl">This weather analytics site is made by</h1>
      <TeamMember />

      <div className="mt-3">
        <h1 className="text-2xl ">Application Objective</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Level 1 (GREEN) “Big Picture” Content
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3">
                <div>
                  <p>
                    Level 1 sub-tasks capture the attention of the users and
                    show how to use your website. It is up to you to decide the
                    best way to:
                  </p>

                  <ul className="list-disc">
                    <li>
                      Show the users the required information, that is, complete
                      the UX/UI design.
                    </li>
                    <li>
                      Retrieve information from your database, where required.
                      That is, you cannot “hard-code” values that must be
                      computed from the database.
                    </li>
                    <li>
                      You should carefully consider how to best complete your
                      UX/UI and ER designs.
                    </li>
                  </ul>

                  <div className="mt-3">
                    <h3>Sub-Task A: Landing Page</h3>
                    <p>
                      This is the first page users see when they visit your
                      website. This should:
                    </p>
                    <ul className="list-disc">
                      <li>
                        Capture the attention of all users of your website.
                      </li>
                      <li>
                        Present the year range (first and last year) for
                        available data (population and temperature) and the
                        corresponding world population and temperature during
                        these years.
                      </li>
                      <li>
                        Identify the total number of years of available data for
                        both global population and temperature.
                      </li>
                      <li className="font-bold">
                        Both must be dynamically calculated from data stored in,
                        and retrieved from, your database.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h3>Sub-Task B: Mission Statement</h3>
                    <p>
                      This presents the overall purpose of your website. This
                      should:
                    </p>
                    <ul className="list-disc">
                      <li>
                        Present your perspective on how your website addresses
                        the social challenge.
                      </li>
                      <li>Describe how your site can be used.</li>
                      <li>
                        Present the Personas that your website targets.{" "}
                        <span className="font-bold">
                          These must be stored in and retrieved from your
                          database.
                        </span>
                      </li>
                      <li>
                        List the names and student numbers of all team members.{" "}
                        <span className="font-bold">
                          These must be stored in and retrieved from your
                          database
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Level 2 (ORANGE) “Shallow Glance” of the data
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3">
                <div>
                  <p>
                    Level 2 sub-tasks explore, at a shallow level, the issue of
                    climate change and population at various geographic levels.
                    You should carefully consider how to complete your UX/UI
                    designs and the ER model to store this business case. The
                    sub-tasks include both UX/UI design and ERM design
                    challenges.
                  </p>

                  <div className="mt-3">
                    <h3>
                      Sub-Task A: Focused view of temperature and population
                      change by Country/Global
                    </h3>
                    <p>
                      Present information on population changes between two user
                      selected years for at either the granularity of countries,
                      or for the world. You should:
                    </p>
                    <ul className="list-disc">
                      <li>
                        Enable a user to choose to view by Countries or the
                        world.
                      </li>
                      <li>
                        If displaying by countries, show each countries name.
                      </li>
                      <li>
                        If displaying by the world region, identify its name as
                        {'World'}.
                      </li>
                      <li>
                        Enable the user to choose a start year and end year.
                      </li>
                      <li>
                        Display the change in temperature and population between
                        the start year and end year (where available). This must
                        be computed from the database using SQL queries. If data
                        is not available for some years, your website should
                        handle this is a suitable manner.
                      </li>
                      <li>
                        Display temperature and population changes between the
                        start year and end year using either:
                        <ul className="pl-5 list-disc">
                          <li>
                            Raw values, for example the population of the
                            country and the average temperature; or
                          </li>
                          <li>
                            Proportional values, for example, the percentage
                            change in the country population and percentage
                            change in average temperature.
                          </li>
                          <li>
                            (Where possible) Calculate ‘The correlation’ between
                            temperature change and population change, using the
                            proportional values. You will need to determine how
                            to effectively compute ‘The correlation’.
                          </li>
                        </ul>
                      </li>

                      <li>
                        When displaying regions, enable a user to sort by
                        temperature or population:
                        <ul className="pl-5 list-disc">
                          <li>
                            The user may choose to sort on either criterion.
                          </li>
                          <li>
                            The user may choose to sort the criteria in
                            ascending or descending order.
                          </li>
                          <li>
                            This sorting must be conducted using SQL queries.
                            That is, we require you to show knowledge of SQL
                            sorting methods and cannot sort using Java or
                            JavaScript.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h3>
                      Sub-Task B: Focused view of temperature change by
                      City/State
                    </h3>
                    <p>
                      Present focused information on the temperature change
                      between two user selected years for the States or Cities
                      of a country that the user has also selected. You should:
                    </p>
                    <ul className="list-disc">
                      <li>Enable a user to choose a Country.</li>
                      <li>
                        Enable the user to choose a start year and end year.
                      </li>
                      <li>
                        Enable the user to choose to see temperatures for either
                        Cities or States.
                      </li>
                      <li>
                        Display the change in temperature between the start year
                        and end year (where available) or all cities or states
                        (depending on the user’s choice) for the country the
                        user selected. This must be computed from the database
                        using SQL queries.
                      </li>
                      <li>
                        Display temperature changes between the start and end
                        year using either:
                        <ul className="pl-5 list-disc">
                          <li>
                            Raw values, for example the average/minimum/maximum
                            temperature; or
                          </li>
                          <li>
                            Proportional values, for example, the percentage
                            change in the average/minimum/maximum temperature.
                          </li>
                        </ul>
                      </li>

                      <li>
                        For the Country
                        <ul className="pl-5 list-disc">
                          <li>
                            Compute the Ranking of the cities or states (1 st ,
                            2 nd , 3 rd , etc.) from <span className="font-bold">largest to smallest change
                            by proportion</span> for each statistic (that is, average,
                            minimum, or maximum temperatures). For example, the
                            city or state with the largest change by proportion
                            for average temperature is given rank 1.
                          </li>
                          <li>
                            Display the three rankings
                            (average/minimum/maximum).
                          </li>
                          <li>
                            You may compute the ranking, either in SQL or
                            through Java.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Level 3 (RED) “Deep-dive” of the data
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3">
                <div>
                  <p>
                    Level 3 sub-tasks explore a deeper view of the issue of
                    climate change and population at various geographic levels.
                    You should carefully consider how to complete your UX/UI
                    designs and the ER model necessary to store this business
                    case. These sub-tasks include some quite complex UX/UI
                    design and ERM design challenges. For top-marks you will
                    need to take a very well-considered approach.
                  </p>

                  <div className="mt-3">
                    <h3>
                      Sub-Task A: Identify changes in temperature over extended
                      periods
                    </h3>
                    <p>
                      Identify the average temperature over selected period of
                      time beginning at a selected year. You should:
                    </p>
                    <ul className="list-disc">
                      <li>
                        Enable the user to select a starting year, a time period
                        (in years), and a geographic region (global, country,
                        state, or city).
                      </li>
                      <li>
                        Calculate the average temperature across the selected
                        period, for the given region beginning from the starting
                        year.
                      </li>
                      <li>
                        Enable the user to select multiple starting years and
                        show the difference in averages for the same region and
                        time period (you will need to think carefully about how
                        to do this effectively when the user selects 3 or more
                        starting years).
                      </li>
                      <li>
                        Enable the user to compare the average, and difference
                        in averages, for multiple regions - country, state or
                        city only (you will need to think carefully about how to
                        do this effectively when the user selects 3 or more
                        starting years).
                      </li>
                      <li>
                        Enable the user to sort all regions by the difference in
                        averages (you will need to think carefully about how to
                        do this effectively when the user selects 3 or more
                        starting years)
                      </li>
                      <li>
                        Enable the user to filter country results, to only show
                        results for regions (countries) that fall within:
                        <ul className="pl-5 list-disc">
                          <li>A selected range of population.</li>
                          <li>A select average temperature change</li>
                        </ul>
                      </li>
                      <li>
                        Retrieve the exact information from your database using
                        as few queries as possible:
                        <ul className="pl-5 list-disc">
                          <li>
                            Ideally, use only a single query (with column
                            selections and JOIN operations)
                          </li>
                          <li>
                            Unnecessary information should not be returned in
                            the SQL queries.
                          </li>
                          <li>
                            Performing the sorting through SQL queries if
                            possible.
                          </li>
                          <li>
                            Note that this is challenge in making suitable SQL
                            queries.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3">
                    <h3>
                      Sub-Task B: Finding time periods with similar temperature
                      and/or population
                    </h3>
                    <p>
                      Enable a user to find time periods that have similar
                      temperature and population. You should:
                    </p>
                    <ul className="list-disc">
                      <li>
                        Enable the user to select a starting year, a time period
                        (in years), and a geographic region (country, state, or
                        city), then find other time periods that are “the most
                        similar” to the chosen combination on a set of user
                        selected properties, such that users may:
                        <ul className="pl-5 list-disc">
                          <li>
                            Select similarity in terms of temperature alone
                          </li>
                          <li>
                            Select similarity in terms of population alone (for
                            country only)
                          </li>
                          <li>
                            Select similarity in terms of population alone (for
                            country only)
                          </li>
                          <li>
                            Select similarity in terms of both temperature and
                            population (for country only)
                          </li>
                          <li>
                            The user can then select to determine similarity in
                            terms of:
                            <ul className="pl-5 list-disc">
                              <li>the absolute values</li>
                              <li>the relative change in values</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        From the user selection, your system must find the{" "}
                        {"<x>"} most similar results, identifying the region,
                        the start year, end year, the values used to determine
                        its similarity to the selected region, as well as the
                        similarity score, using the {`user's`} selection of
                        constraints, where the user chooses the number of
                        regions {"<x>"} to locate:
                        <ul className="pl-5 list-disc">
                          <li>
                            For example, the user selects the starting year
                            1900, a time period of 10 years, and the region
                            ‘Australia’. The user selects similarity by
                            temperature alone based on the absolute value, and
                            to find the 5 most similar regions. Since the user
                            has selected a country (Australia), the system
                            should then find countries (including Australia) and
                            time periods (of 10 years) that have similar start
                            and end temperatures, then display the 5 most
                            similar results.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Present the selected region and most similar regions,
                        along with the relevant data that was used to determine
                        the similarity.
                      </li>
                      <li>
                        Sort the regions that are found by the ‘most similar’ to
                        the ‘least similar’.
                      </li>
                      <li>
                        Retrieve the exact information from your database using
                        as few queries as possible:
                        <ul className="pl-5 list-disc">
                          <li>
                            Ideally, use only a single query (with column
                            selections and JOIN operations)
                          </li>
                          <li>
                            Unnecessary information should not be returned in
                            the SQL queries.
                          </li>
                          <li>
                            Performing the sorting through SQL queries if
                            possible.
                          </li>
                          <li>
                            Note that this is challenge in making suitable SQL
                            queries.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default About;

