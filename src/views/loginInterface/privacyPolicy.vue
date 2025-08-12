<template>
  <div class="service-container">
    <i class="el-icon-close close-icon" @click="close" />
    <div class="service-title">GAIA隐私政策</div>
    <div class="service-date">发布日期：2025年7月26日星期六</div>
    <div class="service-date">生效日期：2025年7月26日星期六</div>
    <div class="service-intro service-intro-item">一）本政策适用范围</div>
    <div class="sevice-content">
      <span>本隐私政策适用于您访问和使用本平台（以下简称
        “本平台”）提供的所有产品与服务，包括但不限于图片生成服务、展示服务、支付系统及微信登录功能。我们深知个人信息对您的重要性，并承诺以高度负责的态度对待您的个人信息安全和隐私保护。本政策旨在帮助您了解我们如何收集、使用、存储、共享和保护您的个人信息，并向您说明您所享有的权利。
        在本政策中，“个人信息”是指与自然人身份直接或间接相关的各类信息，包括但不限于姓名、联系方式、设备标识符、网络身份标识、位置信息、付款信息、生成内容等，可用于识别特定自然人身份或反映特定自然人活动的各种信息。</span><br><span>本政策适用于通过以下方式收集的信息：</span><br>
      <span>(1) 您在使用我们的产品与服务过程中主动提供的信息；</span><br>
      <span>(2) 我们基于产品与服务运行需要自动采集的信息；</span><br>
      <span>(3) 为训练模型、优化算法之目的，对您已授权我们处理的个人信息进行使用；</span><br>
      <span>(4) 我们从第三方依法获取的信息，包括但不限于公共数据库、商业数据源和公开互联网页面等。</span><br>
      <span>当我们从第三方间接获取您的个人信息时，我们会要求该第三方说明信息来源的合法性，并了解其已获得的个人信息处理的授权同意范围。如我们开展业务所需进行的个人信息处理活动超出该授权范围，我们将在处理前另行征得您的明示同意。</span><br>
      <span>当您进行支付时，我们会通过微信支付等第三方支付服务商完成交易。平台本身不会存储您的银行卡号、支付密码等敏感财务信息，仅会保留与订单相关的支付状态与交易编号以便服务确认。</span><br>
    </div>

    <div class="service-intro service-intro-item">二）我们如何收集和使用您的个人信息</div>
    <div class="service-intro sevice-small-tip">2.1收集和使用个人信息的原则</div>
    <div class="sevice-content">
      <span>我们基于合法、正当、必要的原则，收集和使用您的个人信息。如果本平台将您的个人信息用于本政策未载明的其他用途，或基于其他特定目的而收集和使用您的个人信息，我们将以合理的方式另行向您说明对应信息的收集、使用目的、方式、范围等规则，在征得您的授权同意后收集和使用。</span>
    </div>
    <div class="service-intro sevice-small-tip">2.2收集和使用个人信息的方式</div>
    <div class="service-intro sevice-small-tip">2.2.1.注册与登录</div>
    <div class="sevice-content">
      <span>为向您提供账号服务并保障您的账户安全，当您通过微信等第三方平台登录本平台时，我们将依据您的授权获取并存储以下信息：</span><br>
      <span>(1) 微信昵称、头像，用于在平台展示您的基本身份信息；</span><br>
      <span>(2) 微信OpenID和/或UnionID，用于唯一标识您的身份并建立用户账户；</span><br>
      <span>(3) 微信绑定的手机号码（在您授权后获取），用于账户绑定、找回密码、身份验证及客户服务支持。</span><br>
      <span>我们将根据上述信息为您创建用户账户，并提供基础的账户功能，如登录验证、身份识别、个人中心管理等。未经您的授权，我们不会将您的微信信息用于任何未经声明的用途。</span>
    </div>
    <div class="service-intro sevice-small-tip">2.2.2 图片生成服务</div>
    <div class="sevice-content">
      <span>在您使用平台提供的图片生成服务时，为实现核心功能并保障结果质量，我们将收集以下信息：</span><br>
      <span>(1) 您输入的提示词（Prompt），用于引导生成内容</span><br>
      <span>(2) 您主动上传的参考图像（如线稿图、控制图等），用于控制生成图像的风格或结构；</span><br>
      <span>(3) 您选择的模型类型、样式模板、分辨率、参数配置等，用于调整图像生成逻辑；</span><br>
      <span>(4) 系统自动生成的图像文件，包括图像、缩略图、语义图等；</span><br>
      <span>(5) 图像生成过程的相关日志数据（如处理时间、调用模型版本、状态信息等）。</span><br>
      <span>上述信息用于执行图像生成任务、展示结果、记录历史记录以及在您授权后对模型性能进行评估与优化。我们承诺不会将您的提示词、上传图像或生成结果用于商业化模型训练，除非在明确告知并取得您的同意后才会使用。</span>
    </div>
    <div class="service-intro sevice-small-tip">2.2.3 订单与支付信息</div>
    <div class="sevice-content">
      <span>当您使用本平台的购买、订阅等功能时，为完成交易并提供售后服务，我们将根据交易流程收集以下信息：</span><br>
      <span>(1) 订单编号、商品或服务名称、订单金额、支付状态等基础订单信息；</span><br>
      <span>(2) 与微信支付平台交互过程中的交易标识符，用于完成支付验证和对账；</span><br>
      <span>(3) 订购时间、服务周期及发票相关信息（如申请开票时提供）；</span><br>
      <span>(4) 用户在购买过程中的操作行为记录，如点击事件与交易确认时间。</span><br>
      <span>我们将依据上述信息完成交易确认、提供支付凭证、处理退款请求、识别异常支付行为，并用于您在后续使用过程中查询订单记录及售后支持。</span>
    </div>

    <div class="service-intro sevice-small-tip">2.2.4 设备与操作信息</div>
    <div class="sevice-content">
      <span>为保障平台服务的稳定性、提高用户体验并防范安全风险，我们将自动收集您在访问平台过程中产生的设备与操作信息，包括但不限于：</span><br>
      <span>(1) 设备信息：设备型号、操作系统版本、屏幕分辨率、浏览器类型与版本；</span><br>
      <span>(2) 网络信息：IP地址、网络运营商、访问来源、设备位置信息（如开启定位权限时）；</span><br>
      <span>(3) 操作行为：访问页面、点击记录、使用时长、使用路径、搜索关键词等；</span><br>
      <span>(4) 异常与日志信息：系统崩溃记录、错误日志、请求失败记录、安全预警数据。</span><br>
      <span>
        上述信息将用于识别系统异常、优化功能性能、统计用户行为特征并用于安全审计与风险监控。我们不会将这些数据用于追踪个体身份，除非需要配合安全调查或法律要求。</span>
    </div>
    <div class="service-intro service-intro-item">三）我们如何共享、转让、公开、披露您的个人信息</div>
    <div class="sevice-content">
      <span>我们非常重视您个人信息的安全，不会以任何营利目的将您的信息出售给任何第三方，也不会在未经您明确同意的情况下擅自共享、转让或公开披露您的信息。但在以下几类特定情况下，我们可能会基于合法、正当、必要的原则对您的个人信息进行共享、转让或公开披露。</span>
    </div>
    <div class="service-intro sevice-small-tip">3.1 共享</div>
    <div class="sevice-content">
      <span>我们仅在下列必要情形下，与第三方共享您的个人信息：</span>
    </div>

    <div class="service-intro sevice-small-tip">3.1.1与服务提供商共享</div>
    <div class="sevice-content">
      <span>为实现产品或服务功能，我们可能会与经严格筛选并签署保密协议的第三方服务提供商共享信息。例如：</span><br>
      <span>(1) 与微信支付平台共享订单相关的必要信息，用于完成交易验证与支付结算；</span><br>
      <span>(2) 与云服务器提供商（如阿里云、腾讯云等）共享用户存储数据与访问记录，用于托管您的数据、保证访问的稳定性；</span><br>
      <span>(3) 与CDN加速服务商共享访问请求与资源加载信息，以提升访问速度和系统性能；</span><br>
      <span>(4) 图像处理或模型服务供应商共享用于图像生成的提示词、上传图片（在您明确授权时）。</span>
    </div>
    <div class="service-intro sevice-small-tip">3.1.2符合法律法规的共享</div>
    <div class="sevice-content">
      <span>在下列情况下，我们可能依据法律、法规的规定或行政、司法机关的要求共享您的个人信息：</span><br>
      <span>(1) 根据适用法律法规、法院判决、裁定或其他法律程序的要求；</span><br>
      <span>(2) 应公安机关、监管部门依法发出的指令或调查协助请求。</span>
    </div>
    <div class="service-intro sevice-small-tip">3.1.3经您明确授权的其他共享</div>
    <div class="sevice-content">
      <span>在某些情况下，我们可能根据您的主动授权或在特定功能场景（如邀请他人使用、反馈追踪等）下，将相关信息共享给指定第三方。</span><br>
      <span>我们仅会共享为实现目的所必要的信息，并对相关方实施数据安全保护措施，确保其履行保密与合法使用义务。</span>
    </div>

    <div class="service-intro sevice-small-tip">3.2 转让</div>
    <div class="sevice-content">
      <span>我们不会将您的个人信息转让给任何公司、组织或个人，除非满足以下条件之一：</span><br>
      <span>(1) 事先获得您的明确同意或主动授权</span><br>
      <span>(2)
        在公司发生合并、收购、资产重组、分立、破产清算等变更情形，如涉及个人信息的转让，我们将通过公告或其他显著方式告知您相关情况，并要求新的持有方继续受本隐私政策的约束。如果新的接收方改变了信息使用目的和处理方式，我们将重新征得您的授权同意。</span>
    </div>

    <div class="service-intro sevice-small-tip">3.3 公开披露</div>

    <div class="sevice-content">
      <span>我们原则上不会公开披露您的任何个人信息。仅在极少数特定情况下，才会在确保合法、正当、必要的前提下公开披露您的信息，包括但不限于以下情形：</span><br>
      <span>(1) 已获得您的明确同意或您主动提出公开的请求；</span><br>
      <span>(2) 基于公共利益或他人生命财产安全等重大合法权益保护的需要，例如您发布违法内容或危害他人安全的行为；</span>
      <br>
      <span>(3) 根据法律、行政法规规定或法院判决、裁定要求必须公开的情形。</span>
      <br>
      <span>所有公开披露行为将严格控制范围与形式，确保不会泄露其他不相关信息。</span>
    </div>

    <div class="service-intro service-intro-item">四）我们如何保护您的个人信息</div>

    <div class="sevice-content">
      <span>我们高度重视您的个人信息安全，并致力于采取多项符合业界标准、合理可行的安全技术与管理措施，防止您的信息在未经授权的访问、使用、泄露、篡改、损毁或丢失等情况下受到侵犯。</span><br>
      <span>我们承诺在信息收集、存储、传输、处理与销毁的各个环节中建立完善的安全保障体系，力求为您的信息安全提供全生命周期的防护。</span>
    </div>

    <div class="service-intro sevice-small-tip">4.1技术措施</div>
    <div class="sevice-content">
      <span>为保障数据传输与存储过程的安全性，我们已实施以下技术手段：</span><br>
      <span>(1) 数据传输加密：我们使用 HTTPS（SSL/TLS）加密协议保障用户数据在客户端与服务器之间的传输安全，防止数据被窃取或篡改；</span><br>
      <span>(2) 数据存储保护：对本地存储的敏感信息（如提示词记录、图像文件、访问日志等）进行加密处理，确保数据在数据库或缓存中无法被直接读取；</span><br>
      <span>(3) 访问权限控制：采用最小权限原则，对数据库、服务器、接口调用等设置分级访问权限，未授权用户无法获取信息；</span><br>
      <span>(4) 安全审计与入侵检测：我们部署了日志追踪系统与异常行为检测机制，可自动识别潜在风险操作，并记录相关审计数据；</span>
      <br>
      <span>(5) 定期漏洞检测与修复：定期对系统、第三方依赖组件进行安全扫描、补丁更新，防止因软件漏洞导致的数据泄露风险。</span>
    </div>

    <div class="service-intro sevice-small-tip">4.2管理措施</div>
    <div class="sevice-content">
      <span>除技术防护外，我们还采取了多种管理机制来保障数据处理的安全性：</span><br>
      <span>(1) 内部安全制度：我们制定并实施了《数据安全管理制度》《员工数据保密协议》等制度，明确内部数据处理流程与责任分工；</span><br>
      <span>(2) 员工权限管理：对所有涉及用户信息处理的员工实行分级授权、定期审查，仅限业务需要的最小范围人员访问；</span><br>
      <span>(3) 操作留痕与行为监督：员工对系统的每一次访问与数据操作均被记录审计，以便追溯异常行为与责任；</span><br>
      <span>(4) 安全培训与意识教育：我们定期对开发与运营人员开展信息安全、数据合规相关培训，提升团队安全意识；</span><br>
      <span>(5) 第三方合作方安全评估：与技术服务供应商、支付平台等合作前，我们将对其信息安全能力进行评估，并签署保密协议，确保数据处理安全。</span>
    </div>
    <div class="service-intro sevice-small-tip">4.3安全事件响应机制</div>
    <div class="sevice-content">
      <span>尽管已采取多重防护措施，仍无法完全排除可能发生的信息安全事件（如系统攻击、病毒入侵、意外泄露等）。如发生影响您个人信息安全的事件，我们将：</span><br>
      <span>(1) 启动应急响应计划，尽快止损、定位问题源头并进行修复；</span><br>
      <span>(2) 在法律法规要求的时间范围内（如《个人信息保护法》要求72小时内）通过站内信、弹窗、邮件等方式通知受影响用户；</span><br>
      <span>(3) 向有管辖权的监管机关依法报备，并配合调查处理；</span><br>
      <span>(4) 提供合理的补救措施或建议，帮助您降低潜在风险。</span>
    </div>

    <div class="service-intro service-intro-item">五）您的权力</div>
    <div class="sevice-content">
      <span>根据《中华人民共和国个人信息保护法》等相关法律法规规定，您对我们收集和使用的个人信息享有以下权利。我们将提供便捷的方式，确保您可以有效行使这些权利：</span>
    </div>

    <div class="service-intro sevice-small-tip">5.1访问权</div>
    <div class="sevice-content">
      <span>您有权随时访问我们收集和保存的与您有关的个人信息，包括账户资料、订单记录、历史生成内容、登录记录等。</span>
    </div>

    <div class="service-intro sevice-small-tip">5.2更正权</div>
    <div class="sevice-content">
      <span>如您发现我们处理的个人信息存在错误、不准确或不完整的情况，您有权提出更正申请，我们将在核实后及时进行修改。</span>

    </div>

    <div class="service-intro sevice-small-tip">5.3删除权</div>
    <div class="sevice-content">
      <span>在以下情形下，您可以提出删除个人信息的请求：</span>
      <br>
      <span>(1) 我们收集和使用个人信息的目的已实现或无法实现；</span><br>
      <span>(2) 您撤回了授权同意；</span><br>
      <span>(3) 我们违反法律、法规或约定处理个人信息；</span><br>
      <span>(4) 您已注销账户；</span><br>
      <span>(5) 法律法规规定的其他情形。</span>
    </div>

    <div class="service-intro sevice-small-tip">5.4撤回授权的权利</div>
    <div class="sevice-content">
      <span>您可以通过账户设置等方式，随时撤回对我们处理部分非核心功能的个人信息授权。请注意，撤回授权可能会影响相关功能的正常使用。</span>
    </div>

    <div class="service-intro sevice-small-tip">5.4账户注销权</div>
    <div class="sevice-content">
      <span>您有权随时申请注销您的账户，注销成功后，我们将删除与该账户相关的个人信息，或对其进行匿名化处理。但法律法规或监管要求需保留的信息除外。</span><br>
      <span>如您希望行使上述任何权利，请通过第10条“如何联系我们”中列明的方式与我们联系。我们将在收到您的请求后15个工作日内完成核实与处理。如处理期限需延长，我们也会提前向您说明原因。</span>
    </div>

    <div class="service-intro service-intro-item">六）我们如何处理未成年人的个人信息</div>
    <div class="sevice-content">
      <span>我们十分重视对未成年人个人信息的保护。根据法律法规的要求，14周岁以下的未成年人为儿童，其个人信息应在取得监护人同意后收集和处理。</span><br>
      <span>()本平台的服务对象主要为成年人，我们不会主动向14周岁以下的未成年人提供服务，也不会在明知的情况下收集其个人信息；</span><br>
      <span>(2) 如我们获悉用户为14周岁以下未成年人且未取得监护人授权，我们将立即停止服务，并在确认身份后及时删除相关信息；</span><br>
      <span>(3) 若您为未成年人的监护人，发现我们未经同意收集了未成年人的信息，请立即与我们联系，我们将及时核实并依法处理。</span><br>
      <span>(3) 我们建议所有未成年人在监护人陪同下使用本平台服务，确保信息使用安全。</span>
    </div>

    <div class="service-intro service-intro-item">七）您的个人信息如何在全球范围转移</div>
    <div class="sevice-content">
      <span>目前，我们收集和产生的所有个人信息均依法存储于中华人民共和国境内的服务器中。</span><br>
      <span>如将来因业务发展需将您的个人信息传输至境外（例如：使用境外AI模型、云计算平台等服务），我们将严格遵循法律法规的要求：</span><br>
      <span>(1) 在进行跨境传输前，依法进行数据出境安全评估或申报备案；</span><br>
      <span>(2) 向您提供必要的知情说明，并征得您的单独、明确同意；</span><br>
      <span>(3) 向您披露信息接收方的名称、联系方式、处理目的、处理方式以及个人信息种类等信息；</span><br>
      <span>(4) 要求境外接收方履行不低于中国法律规定的数据保护义务，并通过合同等方式明确双方权责。</span>
      <br>
      <span>我们将采取一切合理可行的措施，保障您的个人信息在境外依然获得与境内相当的安全保护水平。</span>
    </div>

    <div class="service-intro service-intro-item">八）本政策如何更新</div>
    <div class="sevice-content">
      <span>为适应法律法规变化、业务发展或产品功能升级，我们可能会对本隐私政策进行修订。您理解并同意，我们将在本页面及时发布更新后的政策文本，并通过以下一种或多种方式通知您：</span><br>
      <span>(1) 网站首页公告；</span><br>
      <span>(2) 站内信、弹窗提示；</span><br>
      <span>(3) 登录后提示阅读等。</span><br>
      <span>若隐私政策的变更涉及您的重大权益（如处理目的变更、信息类型变更、授权范围扩大等），我们将在变更生效前征求您的明确同意。</span>
      <br>
      <span>对于本政策的重大变更（例如处理目的、方式和个人信息种类的变化），我们将在变更生效前，通过弹窗等显著方式再次征求您的明确同意。只有在您点击同意后，我们才会按照更新后的政策处理您的个人信息。</span>
    </div>

    <div class="service-intro service-intro-item">九）个人信息的存储与保留期限</div>
    <div class="sevice-content">
      <span>我们将仅在为实现信息处理目的所必需的时间内保留您的个人信息，并依照法律法规要求或业务实际情况设定信息的最长期限。</span><br>
      <span>(1) 账户信息：自您申请注销账户之日起，我们将保留30天用于安全留档或处理后续纠纷，之后予以删除或匿名化处理；</span><br>
      <span>(2) 图片生成记录、提示词与生成历史：默认保留1年，您可随时手动删除相关历史记录；</span><br>
      <span>(3) 操作日志、访问记录：保留不超过6个月，主要用于安全审计与平台维护；</span><br>
      <span>(4) 订单与交易信息：根据税务、财务法规的要求，可能需保留3至5年。</span>
      <br>
      <span>当您主动提出删除请求，或信息达到保存期限时，我们将依法采取删除、匿名化或去标识化等方式处理您的个人信息，确保数据不再识别特定个人身份。</span>
    </div>

    <div class="service-intro service-intro-item">十）如何联系我们</div>
    <div class="sevice-content">
      <span>如您在使用过程中有任何问题、建议或投诉，可通过以下方式与我们联系：</span><br>
      <span>公司名称：深石（深圳）智能科技有限公司</span><br>
      <span>联系邮箱：contact@gaia.com</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      canGoBack: false
    };
  },
  mounted() {
    // 检查是否可以返回上一页 - 使用更可靠的方法
    this.canGoBack = window.history.length > 1;
  },
  methods: {
    close() {
      // 使用更可靠的导航检查方式
      try {
        // 尝试检查是否有来源页面
        if (this.canGoBack && document.referrer && document.referrer !== window.location.href) {
          this.$router.go(-1);
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        // 如果出现任何错误，默认跳转到首页
        console.warn('Navigation error:', error);
        this.$router.push('/');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.service-container {
  width: 700px;
  margin: 0 auto;
  margin-top: 40px;
  padding-bottom: 700px;
  position: relative;

  .close-icon {
    background: rgb(154, 154, 154);
    color: #fff;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 22px;
    font-weight: 500;
    font-size: 20px;
    font-size: 20px;
    position: fixed;
    top: 50px;
    left: 1250px;
    cursor: pointer;
  }

  .service-title {
    font-size: 22px;
  }

  .service-date {
    font-size: 14px;
    margin-top: 5px;
  }

  .service-intro {
    font-size: 16px;
    margin: 20px 0;
    font-weight: bold;
  }

  .sevice-small-tip {
    margin-bottom: 10px;
  }

  .service-intro-item {
    margin-bottom: 2px;
  }

  .sevice-content {
    font-size: 14px;
    line-height: 20px;

    span:not(:first-child) {
      display: inline-block;
      margin-top: 10px;
    }
  }

  .service-details {
    text-align: center;
    line-height: 25px;
  }
}
</style>
