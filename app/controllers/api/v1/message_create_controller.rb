class Api::V1::MessageCreateController < Api::V1::ApplicationController
  before_action :authorized

  def create
    recipient = User.find params[:user_id]
    current_user = User.find params[:current_user_id]
    @message = current_user.sent.create(recipient: recipient, body: params[:body])
    @message.save
    @old_time = I18n.l(Message.last.created_at, format: :short)
    ActionCable.server.broadcast("MyChannel", { body: params[:body], current_user_id: current_user.id, created_at: @old_time })
  end

  private

  def user_params
    params.permit(:body, :user_id, :current_user_id)
  end
end