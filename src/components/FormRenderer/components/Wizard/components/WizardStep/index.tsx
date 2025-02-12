/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */
import React, { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { WizardInner, WizardStepInfo } from '../../../../../Wizard';
import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

export interface WizardStepProps {
    title: string;
    description?: string;
    fields: Field[];
    stepsInfo: WizardStepInfo[];
    activeStepIndex: number;
    maxStepIndex: number;
    onNextButtonClick: () => void;
    onPreviousButtonClick: () => void;
    submitButtonText?: string;
    isSubmitting?: boolean;
}

const WizardStep: FunctionComponent<WizardStepProps> = ({
    activeStepIndex,
    maxStepIndex,
    title,
    description,
    fields,
    stepsInfo,
    onNextButtonClick,
    onPreviousButtonClick,
    submitButtonText,
    isSubmitting,
}) => {
    const [showError, setShowError] = useState(false);
    const formOptions = useFormApi();
    const content = useMemo(() => {
        const editabledFields = fields.map((item) => ({
            ...item,
            showError,
        }));

        return formOptions.renderForm(editabledFields);
    }, [fields, showError, formOptions]);

    useEffect(() => {
        setShowError(false); // When steps change
    }, [activeStepIndex]);

    const handleNextButtonClick = () => {
        const state = formOptions.getState();
        setShowError(true);
        if (!(state.invalid || state.validating || state.submitting)) {
            onNextButtonClick();
        }
    };

    return (
        <WizardInner
            step={{
                title,
                description,
                content,
            }}
            activeStepIndex={activeStepIndex}
            maxStepIndex={maxStepIndex}
            stepsInfo={stepsInfo}
            stepCount={stepsInfo.length}
            submitButtonText={submitButtonText}
            onNextButtonClick={handleNextButtonClick}
            onPreviousButtonClick={onPreviousButtonClick}
            onCancelButtonClick={formOptions.onCancel}
            onSubmitButtonClick={(event) => {
                event.preventDefault();
                formOptions.handleSubmit();
            }}
            disableStepNavigation={true}
            isLoadingNextStep={isSubmitting}
        />
    );
};

export default WizardStep;
