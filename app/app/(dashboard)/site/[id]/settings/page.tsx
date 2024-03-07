import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/modal/delete-site";
import DomainConfiguration from "@/components/form/domain-configuration";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* <DomainConfiguration domain={data?.customDomain!} />  */}
      <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
        <DomainConfiguration
          domain={data?.customDomain!}
          subdomain={data?.subdomain!}
        />
      </div>
      <Form
        title="Title"
        description="The main text for your site."
        helpText=""
        inputAttrs={{
          name: "title",
          type: "text",
          defaultValue: data?.title!,
          placeholder: "Site Title",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Description"
        description="The second line of your site."
        helpText=""
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Button Link"
        description="Where you want users to contact you."
        helpText="Contact button. Opens in new window when tapped"
        inputAttrs={{
          name: "buttonLink",
          type: "text",
          defaultValue: data?.buttonLink!,
          placeholder: "https://twitter.com/myawesomeusername",
          maxLength: 1000,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Button Color"
        description="Color of Contact Button"
        helpText="Also Color of Buy Button when hovered"
        inputAttrs={{
          name: "buttonColor",
          type: "color",
          defaultValue: data?.buttonColor!,
          placeholder: "Contact Button Color ",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Referral link"
        description="The Referral link of your .box account."
        helpText="Include Referral link to earn referral bonuses from .box."
        inputAttrs={{
          name: "refLink",
          type: "text",
          defaultValue: data?.refLink!,
          placeholder: "https://my.box/?ref=xxxxxx",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Background image"
        description="The background image for your site. Accepted formats: .png, .jpg, .jpeg"
        helpText="Max file size 5MB."
        inputAttrs={{
          name: "image",
          type: "file",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      />

      {/* <Form
        title="Button Text Color"
        description="The twitter handle of your site contact button."
        helpText="Include twitter so the interested buyer can contact directly."
        inputAttrs={{
          name: "buttonTextColor",
          type: "color",
          defaultValue: data?.buttonTextColor!,
          placeholder: "Color of Contact Button Text",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      /> */}
    </div>
  );
}
