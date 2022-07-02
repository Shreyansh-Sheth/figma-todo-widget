// This widget will open an Iframe window with buttons to show a toast message and close the window.

const { widget } = figma;
const {
  useEffect,
  Text,
  Input,
  useSyncedState,
  Frame,
  useSyncedMap,
  AutoLayout,
  Rectangle,
} = widget;

function Widget() {
  const refId = "xasx";
  const map = useSyncedMap("allTodo");
  const [name, setName] = useSyncedState(refId.toString(), "");
  return (
    <AutoLayout
      direction="vertical"
      padding={50}
      cornerRadius={12}
      spacing={5}
      fill={"#F8E2E2"}
    >
      <AutoLayout direction="horizontal">
        <Text>TODO</Text>
      </AutoLayout>
      <AutoLayout spacing={2}>
        <AutoLayout padding={5} cornerRadius={5} fill={"#8CFDB9"}>
          <Input
            placeholder="Enter TODO"
            fontSize={10}
            // stroke={"#F8E2E2"}
            value={name}
            onTextEditEnd={(e) => setName(e.characters)}
          ></Input>
        </AutoLayout>
        <AutoLayout
          verticalAlignItems="center"
          cornerRadius={5}
          fill="#8CFDB9"
          padding={5}
        >
          <Text
            fontSize={10}
            width={"fill-parent"}
            verticalAlignText={"center"}
            horizontalAlignText={"center"}
            onClick={() => {
              if (name.trim().length <= 0) return;
              map.set(Date.now().toPrecision(21), {
                isCompleted: false,
                value: name,
              });
              setName("");
              console.log("Xasxs");
            }}
          >
            Add TODO
          </Text>
        </AutoLayout>
      </AutoLayout>
      {map
        .entries()

        .sort(([key, data]) => {
          return data.isCompleted;
        })
        .map(([key, data]) => {
          return (
            <AutoLayout
              fill={"#CBB6B6"}
              padding={5}
              spacing={2}
              cornerRadius={5}
              width={273}
            >
              <Text
                verticalAlignText="center"
                onClick={() => {
                  console.log("asxas");
                  map.set(key, { ...data, isCompleted: !data.isCompleted });
                }}
              >
                {data.isCompleted ? "✅" : "🔨"}
              </Text>

              <Text
                // verticalAlignText="center"
                width={"fill-parent"}
                key={key}
                textDecoration={data.isCompleted ? "strikethrough" : "none"}
              >
                {data.value}
              </Text>
            </AutoLayout>
          );
        })}
    </AutoLayout>
  );
}

widget.register(Widget);
