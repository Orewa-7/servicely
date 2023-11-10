"use client";
import React, { useState } from "react";

interface ApiCall {
  path: string;
  name: string;
  method: string;
  fields?: string[];
}

const Buttons = ({
  apiCalls,
  api,
}: {
  apiCalls: Array<ApiCall>;
  api: string;
}) => {
  const [usingForm, setUsingForm] = useState<ApiCall | null>([]);
  const [formValue, setFormValue] = useState<object | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const backEndCall = async (call: ApiCall) => {
    if (call.fields) {
      const fields = {};
      call.fields.map((field: string) => {
        fields[field] = field;
      });
      setUsingForm(call);
      setFormValue(fields);
      setResponse(null);
    } else {
      setUsingForm(null);
      const response = await fetch(`${api}${call.path}`);
      const data = await response.json();
      setResponse(JSON.stringify(data));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (usingForm.method === "GET") {
        const response = await fetch(
          `${api}${usingForm.path}/${formValue.idSkill}`
        );
        const data = await response.json();
        setResponse(JSON.stringify(data));
      } else {
        const response = await fetch(`${api}${usingForm.path as string}`, {
          method: usingForm.method as string, // Change the HTTP method as needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-5">
        {apiCalls.map((call, index) => {
          return (
            <button
              key={index}
              className="primary-gradient rounded-xl px-5 py-2"
              onClick={() => backEndCall(call)}
            >
              {call.name}
            </button>
          );
        })}
      </div>
      {usingForm && (
        <form onSubmit={handleSubmit}>
          {usingForm.fields?.map((input, index) => {
            return (
              <input
                key={index}
                type="text"
                className="border-2 border-solid border-sky-500"
                value={formValue ? formValue[input] : ""}
                onChange={(e) => {
                  const updatedFormValue = {
                    ...formValue,
                    [input]: e.target.value,
                  };
                  setFormValue(updatedFormValue);
                  console.log(formValue);
                }}
              />
            );
          })}
          <button type="submit">Submit</button>
        </form>
      )}
      {response}
    </>
  );
};

export default Buttons;
