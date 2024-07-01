(() => {
    "use strict";
    kintone.events.on("app.record.create.show", async (event) => {
        event.record.Table.value.shift();
        await kintone.api(kintone.api.url("/k/v1/app/form/fields.json"), "GET", {app: 24})
        .then(
            (res) => {
                const actions =  Object.values(res.properties.Table.fields.Action5.options).sort((prevAction, nextAction) => prevAction.index - nextAction.index).map((actionObj) => actionObj.label);
                actions.forEach((action, i) => {
                    event.record.Table.value.push({
                        id: i,
                        value: {
                            Action5: {
                                type: "DROP_DOWN",
                                value: action
                            },
                            状況: {
                                type: "CHECK_BOX",
                                value: ['未振り返り']
                            },
                            課題: {
                                type: "MULTI_LINE_TEXT",
                                value: ""
                            }
                        }
                    })
                })
            }
        ).catch(
            () => window.alert("情報を取得できませんでした")
        );
        return event;
    })
})();