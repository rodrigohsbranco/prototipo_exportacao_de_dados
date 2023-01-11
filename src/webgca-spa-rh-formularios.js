export default {

    getSlugIndex({ lsKey }) {

        let slugIndex = localStorage.getItem(lsKey);

        if (slugIndex) {

            try {
                return JSON.parse(atob(slugIndex));
            } catch (err) {
                console.error(err);
            }

        } else {

            return {};

        }

    },

    getIdFromSlugIndex({ lsKey, slug }) {

        let slugIndex = this.getSlugIndex({ lsKey });

        return slugIndex[slug];

    },

    setValueInSlugIndex({ lsKey, slug, id }) {

        let slugIndex = this.getSlugIndex({ lsKey });

        try {

            slugIndex[slug] = id;

            localStorage.setItem(lsKey, btoa(JSON.stringify(slugIndex)));

        } catch (err) {
            console.error(err);
        }

    },

    setSlugIndexFromArray({ lsKey, data }) {

        let slugIndex = {};

        try {

            data.map(
                (item, index, array) => {

                    slugIndex[item.slug] = item.id

                }
            );

            localStorage.setItem(lsKey, btoa(JSON.stringify(slugIndex)));

        } catch (err) {
            console.error(err);
        }

        return slugIndex;

    }

}