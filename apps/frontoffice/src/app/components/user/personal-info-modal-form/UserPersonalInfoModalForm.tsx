import { Button, Flex, InputLabel, Modal, Select, Stepper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserStore } from "../../../../stores/user";
import dayjs from "dayjs"
import { useState } from "react";
import { ID_OPTIONS, idValidator, monthNames, UserForm, years } from "./UserPersonalInfoModalForm.utils";
import { NationalId } from "@monorepo/utils";


export function UserPersonalInfoModalForm() {
    const [active, setActive] = useState(0);
    const [highestStepVisited, setHighestStepVisited] = useState(active);

    const handleStepChange = (nextStep: number) => {
        const isOutOfBounds = nextStep > 3 || nextStep < 0;
        if (isOutOfBounds) return;

        setActive(nextStep);
        setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
    };

    // Allow the user to freely go back and forth between visited steps.
    const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

    const stores = useUserStore()

    const isNeedingDataUpdate = Boolean(stores.isAuthenticated && stores.user && !(
        stores.user.dateOfBirth && stores.user.nationalId && stores.user.nationalIdType
    ))

    function combineFormDate(): Date {
        const {day, month, year} = form.values
        return new Date(Number(day), Number(month), Number(year))
    }


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onClose = () => {}

    const form = useForm<UserForm>({
        initialValues: {
            firstName: "",
            lastName: "",
            nationalIdType: NationalId.Est,
            nationalId: "",
            day: "1",
            month: "1",
            year: "1995"
        },
        validateInputOnBlur: true,
        validate: {
            firstName: (value) => value.length < 2 ? "First name is too short" : null,
            lastName: (value) => value.length < 2 ? "Last name is too short" : null,
            nationalId: (value, values) => idValidator(value, values.nationalIdType),
        },

    })

    const daysInMonth = new Array(dayjs(combineFormDate()).daysInMonth()).fill("").map((_, i) => (i+1).toString())
    const months = monthNames.map((name, index) => ({ label: name, value: index.toString() }))

    return (
        <Modal title="Personal info" opened={isNeedingDataUpdate} onClose={onClose} closeButtonProps={{ display: "none"}}>
                <Stepper active={active} onStepClick={setActive}>
                    <Stepper.Step
                        label="Name"
                        allowStepSelect={shouldAllowSelectStep(0)}>
                        <Flex direction={"column"} gap={"md"}>
                            <TextInput name="firstname" title="firstname" label="First name" {...form.getInputProps("firstName")} />
                            <TextInput name="lastname" title="lastname" label="Last name" {...form.getInputProps("lastName")}/>
                        </Flex>
                    </Stepper.Step>
                    <Stepper.Step   
                        label="Personal info"
                        allowStepSelect={shouldAllowSelectStep(0)}>
                        <Flex direction={"column"} gap={"md"}>
                            <Flex gap={"md"} align={"center"}>
                                <Select data={ID_OPTIONS} title="ID type" label="ID type" {...form.getInputProps("nationalIdType")}/>
                                <TextInput width={"100%"} title="ID code" label="ID code" {...form.getInputProps("nationalId")}/>
                            </Flex>
                            <Flex direction={"column"}>
                                <InputLabel>Date of birth</InputLabel>
                                <Flex gap={"sm"}>
                                    <Select {...form.getInputProps("month")} data={months} name="month" title="month" />
                                    <Select {...form.getInputProps("day")} name="day" title="day" data={daysInMonth} />
                                    <Select {...form.getInputProps("year")} name="year" title="year" data={years} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Stepper.Step>
                    <Stepper.Completed>
                        some info here about clubs
                    </Stepper.Completed>
                </Stepper>
                <Flex justify="center" gap={"md"} mt={"xl"}>
                    <Button variant="default" fullWidth onClick={() => handleStepChange(active - 1)}>
                        Back
                    </Button>
                    <Button fullWidth onClick={() => handleStepChange(active + 1)}>Next step</Button>
                </Flex>
        
            </Modal>
    )
}