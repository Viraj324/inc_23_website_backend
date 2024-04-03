function referralServices(db) {
    async function insertReferral(data) {
        try {
            const judgePromises = data.judges.map(async (judge) => {
                await db.execute(
                    {
                        sql: `INSERT INTO judges_leads 
                    (name, phone, email, organization, location, exp, relation, recommender, event) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, // Corrected to match the number of columns
                        values: [
                            judge.name_judge,
                            judge.phone_judge,
                            judge.email_judge,
                            judge.organization_judge,
                            judge.location_judge,
                            judge.experience_judge,
                            judge.relation_judge,
                            JSON.stringify(data.recommender[0]), // Assuming only one recommender
                            data.eventName
                        ]
                    }
                );
            });

            await Promise.all(judgePromises);

            // res.status(200).json({ msg: "Referral Inserted" }); // Remove this line as it's not needed here
        } catch (err) {
            throw new Error(err);
        }
    }

    return {
        insertReferral
    };
}

export default referralServices;
