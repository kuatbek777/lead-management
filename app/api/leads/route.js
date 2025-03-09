let leads = [];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const newLead = {
      id: leads.length + 1,
      status: "Pending",
      submittedAt: new Date().toISOString(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      linkedin: formData.get("linkedin"),
      visas: formData.getAll("visas"),
      additionalInfo: formData.get("additionalInfo"),
      resume: formData.get("resume"),
    };

    leads.push(newLead);
    return new Response(
      JSON.stringify({
        message: "Lead submitted successfully!",
        data: newLead,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify(leads), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    const leadIndex = leads.findIndex((lead) => lead.id === id);
    if (leadIndex === -1) {
      return new Response(JSON.stringify({ message: "Lead not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    leads[leadIndex].status = status;

    return new Response(
      JSON.stringify({ message: "Lead status updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
