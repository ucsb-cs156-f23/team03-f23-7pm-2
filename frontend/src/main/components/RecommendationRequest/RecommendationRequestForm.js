import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function RecommendationRequestForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;
    
    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="RecommendationRequestForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="requesterEmail">RequesterEmail</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-requesterEmail"
                    requesterEmail="requesterEmail"
                    type="text"
                    isInvalid={Boolean(errors.requesterEmail)}
                    {...register("requesterEmail", { required: "requesterEmail is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.requesterEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="professorEmail">ProfessorEmail</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-professorEmail"
                    professorEmail="professorEmail"
                    type="text"
                    isInvalid={Boolean(errors.professorEmail)}
                    {...register("professorEmail", { required: "professorEmail is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.professorEmail?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="explanation">Explanation</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-explanation"
                    explanation="explanation"
                    type="text"
                    isInvalid={Boolean(errors.explanation)}
                    {...register("explanation", { required: "explanation is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.explanation?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateRequested">DateRequested</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-dateRequested"
                    dateRequested="dateRequested"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateRequested)}
                    {...register("dateRequested", { required: true, pattern: isodate_regex})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateRequested && "dateRequested is required."}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dateNeeded">DateNeeded</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-dateNeeded"
                    dateNeeded="dateNeeded"
                    type="datetime-local"
                    isInvalid={Boolean(errors.dateNeeded)}
                    {...register("dateNeeded", { required: true, pattern: isodate_regex})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dateNeeded && "dateNeeded is required."}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="done">Done</Form.Label>
                <Form.Control
                    data-testid="RecommendationRequestForm-done"
                    done="done"
                    type="text"
                    isInvalid={Boolean(errors.done)}
                    {...register("done", { required: "done is required."})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.done?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="RecommendationRequestForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="RecommendationRequestForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RecommendationRequestForm;